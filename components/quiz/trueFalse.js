import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import Markdown from 'components/quiz/markdown'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import Submit from 'components/quiz/submit'
import isEmpty from 'lodash/isEmpty'

const TrueFalse = (props) => {
  const {
    question,
    state,
    handleContinue,
    handleSubmit,
    isDisabled,
    handleSkip,
    currentQuestionIdx,
    isLastQuestion,
    showExplanation,
    number,
    currentAnswer,
    nested,
  } = props
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnswered =
    question.correctAnswer && (state.matches('answered') || question.value)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number} nested={nested}>
        <Markdown>{question.text}</Markdown>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <>
            <div className="text-lg font-semibold">Is that true or false?</div>

            <div
              className="mt-4 w-full overflow-hidden rounded-md"
              role="group"
              aria-labelledby="choices"
            >
              <div
                className={`border-cool-gray-100 border-b bg-white ${
                  isDisabled ? '' : 'hover:bg-cool-gray-50'
                } ${
                  hasAnswered && question.correctAnswer === 'true'
                    ? 'bg-green-100'
                    : ''
                } ${
                  hasAnswered && question.correctAnswer !== 'true'
                    ? 'bg-red-100'
                    : ''
                }`}
              >
                <label
                  className={`block py-2 px-3 ${
                    isDisabled ? '' : 'cursor-pointer'
                  }`}
                >
                  <input
                    disabled={isDisabled}
                    type="radio"
                    name="value"
                    value="true"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.value === 'true'}
                    className="mr-2 form-radio bg-cool-gray-100 border border-cool-gray-200"
                  />
                  True
                </label>
              </div>
              <div
                className={` bg-white ${
                  isDisabled ? '' : 'hover:bg-cool-gray-50'
                } ${
                  hasAnswered && question.correctAnswer === 'false'
                    ? 'bg-green-100'
                    : ''
                } ${
                  hasAnswered && question.correctAnswer !== 'false'
                    ? 'bg-red-100'
                    : ''
                }`}
              >
                <label
                  className={`block py-2 px-3 ${
                    isDisabled ? '' : 'cursor-pointer'
                  }`}
                >
                  <input
                    disabled={isDisabled}
                    type="radio"
                    name="value"
                    value="false"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.value === 'false'}
                    className="mr-2 form-radio bg-cool-gray-100 border border-cool-gray-200"
                  />
                  False
                </label>
              </div>
              {formik.submitCount > 0 && formik.errors.value}
            </div>

            {state.matches('answered') && (
              <motion.div
                layout
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className={`w-full text-center mt-4 px-3 py-3 rounded-md font-semibold ${
                  hasAnsweredCorrectly
                    ? 'bg-green-100 text-green-700'
                    : 'bg-cool-gray-100 text-cool-gray-700 '
                } transition-colors ease-in-out duration-300`}
              >
                {hasAnsweredCorrectly ? 'Correct! 🎉' : 'Incorrect'}
              </motion.div>
            )}
            {question.explanation || question.correctAnswer ? (
              <Submit
                isDisabled={isDisabled}
                isSubmitting={state.matches('answering')}
                explanation={question.explanation}
              />
            ) : (
              isEmpty(question.value) && (
                <SubmitAndContinue
                  isLastQuestion={isLastQuestion}
                  state={state}
                  handleContinue={handleContinue}
                  isDisabled={state.matches('answering')}
                  isSubmitting={state.matches('answering')}
                />
              )
            )}
          </>
        </form>
      </AnswerWrapper>
      <AnimateSharedLayout>
        <AnimatePresence>
          {showExplanation && <Explanation>{question.explanation}</Explanation>}
        </AnimatePresence>
      </AnimateSharedLayout>
    </QuizWrapper>
  )
}

export default TrueFalse
