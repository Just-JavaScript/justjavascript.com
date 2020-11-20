import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Submit from 'components/quiz/submit'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import Markdown from 'components/quiz/markdown'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'
import {isEmpty} from 'lodash'

const MultipleImageChoice = (props) => {
  const {
    question,
    state,
    handleContinue,
    handleSubmit,
    isDisabled,
    currentAnswer,
    handleSkip,
    number,
    isLastQuestion,
    showExplanation,
    currentQuestion,
    nested,
  } = props
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number} nested={nested}>
        <Markdown>{question.text}</Markdown>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div role="group" aria-labelledby="choices">
            <div
              className="grid gap-2 sm:grid-cols-2 grid-cols-1 py-4"
              role="group"
              aria-labelledby="choices"
            >
              {question.choices &&
                question.choices.map((choice) => {
                  const hasAnswered =
                    question.correctAnswer &&
                    (state.matches('answered') || question.value)
                  const correctAnswer =
                    hasAnswered && question.correctAnswer === choice.value
                  const incorrectAnswer =
                    hasAnswered && formik.values.value === choice.value
                  return (
                    <div
                      key={choice.value}
                      className={`p-2 rounded-md ${
                        correctAnswer ? 'bg-green-100' : ''
                      } ${incorrectAnswer ? 'bg-red-100' : ''}`}
                    >
                      <label className="flex flex-wrap items-center">
                        <input
                          disabled={isDisabled}
                          type="radio"
                          name="value"
                          value={choice.value}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={
                            formik.values.value === choice.value ||
                            (currentAnswer
                              ? choice.value === currentAnswer.value
                              : false)
                          }
                          className="mr-1 form-radio bg-cool-gray-100 border border-cool-gray-200"
                        />
                        {choice.text}
                        {/* {correctAnswer && '✅'}
                        {incorrectAnswer && '❌'} */}
                        <img
                          src={choice.image}
                          alt={choice.text}
                          className="border border-gray-200"
                        />
                      </label>
                    </div>
                  )
                })}
            </div>
          </div>
          {formik.submitCount > 0 && formik.errors.value}
          {question.canComment === true && (
            <>
              {/* <label htmlFor="comment" className="block mt-2">
              Explain why
            </label> */}
              {state.matches('answered') ? (
                <Markdown className="p-3 mt-4">
                  {formik.values.comment}
                </Markdown>
              ) : (
                <>
                  <textarea
                    className="w-full p-3 bg-cool-gray-100 border border-gray-200 prose rounded-md h-24 mt-4"
                    disabled={isDisabled}
                    id="comment"
                    name="comment"
                    placeholder="Can you explain why?"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comment}
                  />
                  {formik.submitCount > 0 && formik.errors.comment}
                </>
              )}
            </>
          )}
          {state.matches('answered') && question.correctAnswer && (
            <motion.div
              layout
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className={`w-full text-center mt-4 px-3 py-3 rounded-md font-semibold ${
                hasAnsweredCorrectly
                  ? 'bg-green-100 text-green-700'
                  : 'bg-cool-gray-100 text-gray-700 '
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
              // !state.matches('answered') &&
              <SubmitAndContinue
                isLastQuestion={isLastQuestion}
                state={state}
                handleContinue={handleContinue}
                isDisabled={state.matches('answering')}
                isSubmitting={state.matches('answering')}
              />
            )
          )}
        </form>
      </AnswerWrapper>
      <AnimatePresence>
        {showExplanation && <Explanation>{question.explanation}</Explanation>}
      </AnimatePresence>
    </QuizWrapper>
  )
}

export default MultipleImageChoice
