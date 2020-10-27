import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import Markdown from 'components/quiz/markdown'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import {AnimatePresence} from 'framer-motion'
import Answer from 'components/mdx/answer'

const TrueFalse = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  handleSkip,
  currentQuestionIdx,
  isLastQuestion,
  showExplanation,
  currentAnswer,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const correctAnswer = question.correctAnswer
  return (
    <QuizWrapper
      handleSkip={isLastQuestion ? false : handleSkip}
      handleContinue={handleContinue}
    >
      <QuestionWrapper>
        <div className="mb-1">
          <span className="mr-2 p-2 rounded-full w-6 h-6 text-xs font-bold inline-flex justify-center items-center bg-indigo-100 text-indigo-800">
            {currentQuestionIdx + 1}
          </span>
        </div>
        <Markdown>{question.text}</Markdown>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <>
            {/* {answerOpened && question.explanation && question.explanation} */}
            <div className="text-lg font-semibold">
              Is this statement true or false?
            </div>

            <div
              className="mt-4 grid grid-flow-col-dense gap-2"
              role="group"
              aria-labelledby="choices"
            >
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value="true"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === 'true'}
                  className="mr-1"
                />
                True{' '}
                {correctAnswer &&
                  (state.matches('answered') || question.value) &&
                  (correctAnswer === 'true' ? '✅' : '❌')}
              </label>
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value="false"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === 'false'}
                  className="mr-1"
                />
                False{' '}
                {correctAnswer &&
                  (state.matches('answered') || question.value) &&
                  (correctAnswer === 'false' ? '✅' : '❌')}
              </label>
            </div>
            {formik.errors.value}
            {correctAnswer &&
              (state.matches('answered') || question.value) &&
              (correctAnswer === formik.values.value
                ? '🎉 Correct!'
                : 'Incorrect')}
            <SubmitAndContinue
              isLastQuestion={isLastQuestion}
              state={state}
              handleContinue={handleContinue}
              isDisabled={state.matches('answering')}
              isSubmitting={state.matches('answering')}
            />
          </>
        </form>

        <AnimatePresence>
          {showExplanation && (
            <Explanation className="max-h-full">
              {question.explanation}
            </Explanation>
          )}
        </AnimatePresence>
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default TrueFalse
