import React from 'react'
import { useMachine } from '@xstate/react'
import { quizMachine } from 'machines/quiz-machine'
import { isEmpty, first, indexOf, find, get } from 'lodash'
import { useRouter } from 'next/router'
import { scroller } from 'react-scroll'
import slugify from 'slugify'
import { getUserAnswerFromLocalStorage } from 'utils/quiz-answers-in-local-storage'
import { useViewer } from 'context/viewer-context'
import { useProgress } from 'context/progress-context'

export default function useEggheadQuiz(quiz, currentQuestion, setCurrent) {
  const quizQuestions = get(quiz, 'questions') || null
  const { id, title, slug, version } = quiz
  const { viewer } = useViewer()
  const contactId = get(viewer, 'contact_id')

  const [state, send] = useMachine(quizMachine, {
    context: {
      questions: quizQuestions,
      currentQuestionId: get(currentQuestion, 'id') || null,
      quiz: {
        id: id,
        title: title,
        slug: slug || (title && slugify(title, { lower: true })),
        version: version,
      },
    },
  })

  const { questions } = state.context
  const currentQuestionIdx =
    questions && indexOf(quizQuestions, currentQuestion)
  const nextQuestionId =
    questions &&
    (currentQuestionIdx + 1 === questions.length
      ? get(first(questions), 'id') // go back to first question
      : get(questions[currentQuestionIdx + 1], 'id'))

  const nextQuestion = questions && find(questions, { id: nextQuestionId })
  const nextQuestionIdx = nextQuestion && indexOf(questions, nextQuestion)

  const isDisabled = state.matches('answering') || state.matches('answered')
  const isLastQuestion =
    questions && currentQuestionIdx + 1 === questions.length

  const showExplanation =
    state.matches('answered') && currentQuestion.answer?.description

  function scrollTo(question, scrollOffset = -30) {
    scroller.scrollTo(question, {
      // tweak this for pleasant scrolling exp
      smooth: 'easeInOutQuart',
      delay: 0,
      duration: 900,
      offset: scrollOffset,
      ignoreCancelEvents: true,
    })
  }

  const router = useRouter()

  // persisting answers

  const isAnswered = !isEmpty(
    getUserAnswerFromLocalStorage(get(currentQuestion, 'id'))
  )
  const currentAnswer =
    getUserAnswerFromLocalStorage(get(currentQuestion, 'id')) || null

  const { setProgress } = useProgress()

  function handleContinue(scrollOffset) {
    if (isLastQuestion) {
      // set quiz as complete
      setProgress({
        episode: `quiz/${router.query.slug}`,
        progress: {
          completed: true,
          date: Date.now(),
        },
        setCompleted: () => {},
      })
      // navigate to completed page
      router.push({
        pathname: `/quiz/completed`,
        query: { quiz: router.query.slug },
      })
    } else {
      setCurrent({
        index: nextQuestionIdx,
        id: nextQuestionId,
      })
      scrollTo(nextQuestionId, scrollOffset || -30)
    }
  }

  function handleSkip() {
    setCurrent({ index: nextQuestionIdx, id: nextQuestionId })
    scrollTo(nextQuestionId)
  }
  function handleShowNextQuestion() {
    !isLastQuestion &&
      !state.matches('idle') &&
      setCurrent({ index: nextQuestionIdx, id: nextQuestionId })
  }

  function handleSubmit(values, _actions) {
    // const now = Date.now()
    // const date = new Date(now).toUTCString()
    // const context = {quizId: quiz.id, questionId: question.id, date}
    // const response = {...values, question, context}

    const answer = values.answer.comment ? values.answer : values.answer.value
    send('SUBMIT', {
      userAnswer: answer,
      contactId: contactId,
      ...currentQuestion,
    })
    !currentQuestion.answer?.description && !isLastQuestion && handleContinue()
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
