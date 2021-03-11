import React from 'react'
import {useMachine} from '@xstate/react'
import {quizMachine} from 'machines/quizMachine'
import {isEmpty, first, indexOf, find, get} from 'lodash'
import {useRouter} from 'next/router'
import {scroller} from 'react-scroll'
import slugify from 'slugify'
import {GetUserAnswerFromLocalStorage} from 'utils/quiz-answers-in-local-storage'

export default function useEggheadQuizMachine(
  quiz,
  currentQuestion,
  setCurrent
) {
  const quizQuestions = get(quiz, 'questions') || null
  const {id, title, slug, version} = quiz

  const [state, send] = useMachine(quizMachine, {
    context: {
      questions: quizQuestions,
      currentQuestionId: get(currentQuestion, 'id') || null,
      quiz: {
        id: id,
        title: title,
        slug: slug || (title && slugify(title, {lower: true})),
        version: version,
      },
    },
  })

  console.log(state)

  const {questions} = state.context
  const currentQuestionIdx =
    questions && indexOf(quizQuestions, currentQuestion)
  const nextQuestionId =
    questions &&
    (currentQuestionIdx + 1 === questions.length
      ? get(first(questions), 'id') // go back to first question
      : get(questions[currentQuestionIdx + 1], 'id'))

  const nextQuestion = questions && find(questions, {id: nextQuestionId})
  const nextQuestionIdx = nextQuestion && indexOf(questions, nextQuestion)

  // persisting answers

  const isAnswered = !isEmpty(
    GetUserAnswerFromLocalStorage(get(currentQuestion, 'id'))
  )

  console.log(isAnswered)

  const currentAnswer =
    GetUserAnswerFromLocalStorage(get(currentQuestion, 'id')) || null

  /////

  const isDisabled = state.matches('answering') || state.matches('answered')
  const isLastQuestion =
    questions && currentQuestionIdx + 1 === questions.length

  const showExplanation =
    state.matches('answered') && currentQuestion.answer?.description

  function scrollTo(question) {
    scroller.scrollTo(question, {
      // tweak this for pleasant scrolling exp
      smooth: 'easeInOutQuart',
      delay: 100,
      duration: 900,
      ignoreCancelEvents: true,
    })
  }

  const router = useRouter()

  function handleContinue() {
    isLastQuestion
      ? router.push(`/completed?quiz=${get(quiz, 'id')}`)
      : nextQuestionId !==
        (setCurrent({
          index: nextQuestionIdx,
          id: nextQuestionId,
        }),
        scrollTo(nextQuestionId))

    // if (isLastQuestion) {
    //   router.push(`/completed?quiz=${get(quiz, 'id')}`)
    // } else {
    //   setCurrent({
    //     index: nextQuestionIdx,
    //     id: nextQuestionId,
    //   })
    //   scrollTo(nextQuestionId)
    // }
  }

  function handleSkip() {
    setCurrent({index: nextQuestionIdx, id: nextQuestionId})
    scrollTo(nextQuestionId)
  }
  function handleShowNextQuestion() {
    !isLastQuestion &&
      !state.matches('idle') &&
      setCurrent({index: nextQuestionIdx, id: nextQuestionId})
  }

  function handleSubmit(values, _actions) {
    // TODO: submit all required variables
    // const now = Date.now()
    // const date = new Date(now).toUTCString()
    // const context = {quizId: quiz.id, questionId: question.id, date}
    // const response = {...values, question, context}

    const answer = values.answer.value
    send('SUBMIT', {userAnswer: answer, ...currentQuestion})
  }

  return {
    send,
    state,
    handleSkip,
    isDisabled,
    isAnswered,
    handleSubmit,
    currentAnswer,
    handleContinue,
    nextQuestionId,
    isLastQuestion,
    currentQuestion,
    showExplanation,
    nextQuestionIdx,
    number: currentQuestionIdx + 1,
    handleShowNextQuestion,
  }
}
