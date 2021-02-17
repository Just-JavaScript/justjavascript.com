import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Continue from './continue'

const Statement = (props) => {
  const {question, handleContinue, number, currentQuestion} = props

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number} nested={props.nested}>
        <Markdown>{question.prompt}</Markdown>
      </QuestionWrapper>
      {question.id === currentQuestion.id ? (
        <Continue onClick={handleContinue} />
      ) : (
        <div className="h-10" />
      )}
    </QuizWrapper>
  )
}

export default Statement
