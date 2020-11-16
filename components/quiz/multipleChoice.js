import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Submit from 'components/quiz/submit'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import Markdown from 'components/quiz/markdown'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {isEmpty} from 'lodash'
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion'

const MultipleChoice = (props) => {
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
    currentQuestion,
  } = props
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value
  const showExplanation =
    question.explanation && (state.matches('answered') || question.value)
  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number}>
        <Markdown>{question.text}</Markdown>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div role="group" aria-labelledby="choices">
            {/* <div className="text-sm uppercase tracking-wide font-semibold">
              Your answer
              {showExplanation && hasAnsweredCorrectly
                ? '🎉 Correct!'
                : 'Incorrect'}
            </div> */}

            {question.choices &&
              question.choices.map((choice, i) => {
                const correctAnswer = question.correctAnswer === choice.value
                return (
                  <div
                    className={`border-b bg-white ${
                      isDisabled ? '' : 'hover:bg-cool-gray-50'
                    } ${
                      question.choices.length === i + 1
                        ? 'border-transparent'
                        : 'border-cool-gray-100'
                    }`}
                    key={choice.value}
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
                        value={choice.value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={
                          formik.values.value === choice.value ||
                          (currentAnswer
                            ? choice.value === currentAnswer.value
                            : false)
                        }
                        className="mr-2 -mt-1 form-radio"
                      />
                      {state.matches('answered') &&
                        question.correctAnswer &&
                        (state.matches('answered') || question.value) &&
                        question.correctAnswer &&
                        (correctAnswer
                          ? '✅ '
                          : formik.values.value === choice.value && '❌ ')}
                      <Markdown className="inline-block prose md:prose-lg text-gray-900">
                        {choice.text}
                      </Markdown>{' '}
                    </label>
                  </div>
                )
              })}
            {formik.submitCount > 0 && formik.errors.value}
            {question.canComment === true && (
              <>
                {/* <label htmlFor="comment" className="block mt-2">
              Explain why
            </label> */}
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
          </div>
          {/* <AnimatePresence>
            {state.matches('answered') && question.correctAnswer && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="pt-4 font-xl font-semibold"
              >
                {hasAnsweredCorrectly ? '🎉 Correct!' : 'Incorrect'}
              </motion.div>
            )}
          </AnimatePresence> */}

          {state.matches('answered') && (
            <motion.div
              layout
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className={`w-full text-center mt-4 px-3 py-3 rounded-md font-semibold ${
                hasAnsweredCorrectly
                  ? 'bg-teal-100 text-teal-700'
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
        </form>
      </AnswerWrapper>
      <AnimateSharedLayout>
        <AnimatePresence>
          {showExplanation && <Explanation>{question.explanation}</Explanation>}
        </AnimatePresence>
      </AnimateSharedLayout>
      {/* {state.matches('answered') &&
        (question.explanation || question.correctAnswer) && (
          <div className="py-8 mx-auto w-full flex items-center justify-center">
            <Continue
              isLastQuestion={isLastQuestion}
              onClick={handleContinue}
            />
          </div>
        )} */}
    </QuizWrapper>
  )
}

export default MultipleChoice