import {useMachine} from '@xstate/react'
import {quizMachine} from 'machines/quizMachine'
import {isEmpty, first, indexOf, find, get} from 'lodash'
import {useRouter} from 'next/router'
import {scroller} from 'react-scroll'

export default function useEggheadQuizMachine(
  quizId,
  quiz,
  question,
  setCurrent,
) {
  const initialQuestions = get(quiz, 'questions') || null

  const [state, send] = useMachine(quizMachine, {
    context: {
      quizId: quizId,
      questions: initialQuestions,
      currentQuestionId: get(question, 'id') || null,
    },
  })

  const {questions, currentQuestionId} = state.context

  const currentQuestion = questions && find(questions, {id: currentQuestionId})
  // const currentQuestionIdx = questions && indexOf(questions, currentQuestion)
  const currentQuestionIdx = questions && indexOf(questions, question)

  const nextQuestionId =
    questions &&
    (currentQuestionIdx + 1 === questions.length
      ? get(first(questions), 'id') // go back to first question
      : get(questions[currentQuestionIdx + 1], 'id'))
  const nextQuestion = questions && find(questions, {id: nextQuestionId})
  const nextQuestionIdx = nextQuestion && indexOf(questions, nextQuestion)
  // const isCurrentQuestionAnswered = find(state.context.answers, {
  //   id: currentQuestionId,
  // })
  const isAnswered = !isEmpty(get(currentQuestion, 'answer'))

  // const currentAnswer = find(answers, {id: currentQuestionId})
  const currentAnswer = get(currentQuestion, 'answer') || null

  const isDisabled = state.matches('answering') || state.matches('answered')
  const isLastQuestion = currentQuestionIdx + 1 === questions.length
  const showExplanation =
    currentQuestion.explanation &&
    (!state.matches('idle') || currentQuestion.value)

  function scrollTo(question) {
    scroller.scrollTo(question, {
      // tweak this for pleasant scrolling exp
      smooth: 'easeInOutQuart',
      delay: 100,
      duration: 900,
    })
  }

  const router = useRouter()

  function handleContinue() {
    if (isLastQuestion) {
      router.push(`/completed?quiz=${quizId}`)
    } else {
      // send('NEXT_QUESTION', {nextQuestionId: nextQuestionId})
      setCurrent({index: nextQuestionIdx, id: nextQuestionId})
      scrollTo(nextQuestionId)
    }
  }

  function handleSkip() {
    setCurrent({index: nextQuestionIdx, id: nextQuestionId})
    scrollTo(nextQuestionId)
  }

  function handleFinish() {}

  function handleSubmit(values, _actions) {
    // const now = Date.now()
    // const date = new Date(now).toUTCString()
    // const context = {quizId: quiz.id, questionId: question.id, date}
    // const response = {...values, question, context}

    send('SUBMIT', {answer: {...values, ...question}})
  }

  return {
    currentQuestion,
    nextQuestionId,
    state,
    send,
    handleContinue,
    handleSubmit,
    handleSkip,
    isDisabled,
    isAnswered,
    currentAnswer,
    currentQuestionIdx,
    isLastQuestion,
    handleFinish,
    showExplanation,
  }
}
