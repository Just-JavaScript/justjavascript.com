import {useMachine} from '@xstate/react'
import {quizMachine} from 'machines/quizMachine'
import {isEmpty, first, indexOf, find, get} from 'lodash'
import {useRouter} from 'next/router'
import {scroller} from 'react-scroll'

export default function useEggheadQuizMachine(
  quiz,
  currentQuestion,
  setCurrent,
) {
  const quizQuestions = get(quiz, 'questions') || null

  const [state, send] = useMachine(quizMachine, {
    context: {
      questions: quizQuestions,
      currentQuestionId: get(currentQuestion, 'id') || null,
      quizId: get(quiz, 'id'),
    },
  })

  const {questions} = state.context
  const currentQuestionIdx = questions && indexOf(questions, currentQuestion)
  const nextQuestionId =
    questions &&
    (currentQuestionIdx + 1 === questions.length
      ? get(first(questions), 'id') // go back to first question
      : get(questions[currentQuestionIdx + 1], 'id'))
  const nextQuestion = questions && find(questions, {id: nextQuestionId})
  const nextQuestionIdx = nextQuestion && indexOf(questions, nextQuestion)
  const isAnswered = !isEmpty(get(currentQuestion, 'answer'))
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
      router.push(`/completed?quiz=${get(quiz, 'id')}`)
    } else {
      setCurrent({index: nextQuestionIdx, id: nextQuestionId})
      scrollTo(nextQuestionId)
    }
  }

  function handleSkip() {
    setCurrent({index: nextQuestionIdx, id: nextQuestionId})
    scrollTo(nextQuestionId)
  }

  function handleSubmit(values, _actions) {
    // TODO: submit all required variables
    // const now = Date.now()
    // const date = new Date(now).toUTCString()
    // const context = {quizId: quiz.id, questionId: question.id, date}
    // const response = {...values, question, context}

    send('SUBMIT', {answer: {...values, ...currentQuestion}})
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
    currentQuestionIdx,
  }
}
