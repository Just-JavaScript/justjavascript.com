import * as React from 'react'
import QuestionToShow from 'components/quiz/questionToShow'
import {Element as ScrollElement} from 'react-scroll'
import useEggheadQuiz from '../../../hooks/useEggheadQuiz'
import {map, filter, first, find, get} from 'lodash'

const Quiz = ({children, title, id}) => {
  const childrenArr = React.Children.toArray(children)
  const questions = childrenArr.map((question) => {
    const {
      id,
      type,
      children,
      required,
      version,
      choices,
      correctChoices,
    } = question.props
    const isMultipart = type === 'QuestionSet'

    const prompt =
      find(children, {props: {mdxType: 'Prompt'}}) || (!isMultipart && children)
    const answer = find(children, {props: {mdxType: 'Answer'}})
    const nestedQuestions = filter(
      question.props.children,
      (q) => q.props.mdxType !== 'Prompt'
    )
    const questions = isMultipart
      ? nestedQuestions.map((q) => {
          const {
            id,
            type,
            children,
            required,
            version,
            choices,
            correctChoices,
          } = q.props
          const prompt =
            find(children, {props: {mdxType: 'Prompt'}}) || children
          const answer = find(children, {props: {mdxType: 'Answer'}})
          return {
            id,
            __typename: type,
            required,
            version,
            prompt,
            answer: {
              description: answer,
            },
            choices,
            correctChoices,
          }
        })
      : []

    return {
      id,
      __typename: type,
      prompt,
      answer: {
        description: answer,
      },
      choices,
      correctChoices,
      required,
      version,
      questions: [...questions],
    }
  })

  const quiz = {
    id,
    title,
    questions,
  }

  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    id: get(first(get(quiz, 'questions')), 'id'),
  })

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gray-50">
      {map(quiz.questions, (question, index) => {
        const {
          state,
          handleSkip,
          isAnswered,
          isDisabled,
          handleSubmit,
          currentAnswer,
          handleContinue,
          isLastQuestion,
          showExplanation,
          nextQuestionIdx,
          nextQuestionId,
          number,
        } = useEggheadQuiz(quiz, question, setCurrentQuestion)

        return state.matches('initializing') ? (
          'loading...'
        ) : (
          <div className="w-full mx-auto max-w-screen-sm" key={question.id}>
            <ScrollElement name={question.id} />
            {index <= currentQuestion.index && (
              <QuestionToShow
                question={question}
                number={number}
                currentAnswer={currentAnswer}
                isLastQuestion={isLastQuestion}
                state={state}
                handleSubmit={handleSubmit}
                handleContinue={handleContinue}
                isDisabled={isDisabled}
                handleSkip={handleSkip}
                showExplanation={showExplanation}
                isAnswered={isAnswered}
                currentQuestion={currentQuestion}
                nextQuestionIdx={nextQuestionIdx}
                nextQuestionId={nextQuestionId}
                setCurrentQuestion={setCurrentQuestion}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Quiz
