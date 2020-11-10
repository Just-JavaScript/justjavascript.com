import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import Markdown from 'components/quiz/markdown'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'
import {isEmpty} from 'lodash'

const MultipleImageChoice = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  currentAnswer,
  handleSkip,
  number,
  isLastQuestion,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const hasAnsweredCorrectly = question.correctAnswer === formik.values.value
  const showExplanation =
    question.explanation && (state.matches('answered') || question.value)

  return (
    <QuizWrapper
      handleSkip={isLastQuestion ? false : handleSkip}
      handleContinue={handleContinue}
      answered={state.matches('answered')}
    >
      <QuestionWrapper number={number}>
        <Markdown>{question.text}</Markdown>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div role="group" aria-labelledby="choices">
            <div
              className="grid gap-4 grid-cols-2 py-4"
              role="group"
              aria-labelledby="choices"
            >
              {question.choices &&
                question.choices.map((choice) => {
                  const correctAnswer = question.correctAnswer === choice.value
                  return (
                    <div key={choice.value}>
                      <label>
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
                          className="mr-1"
                        />
                        {choice.text}{' '}
                        {(state.matches('answered') || question.value) &&
                          (correctAnswer
                            ? '✅'
                            : formik.values.value === choice.value && '❌')}
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
          {formik.errors.value}
          {state.matches('answered') && (
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
      {state.matches('answered') &&
        (question.explanation || question.correctAnswer) && (
          <div className="py-8 mx-auto w-full flex items-center justify-center">
            <Continue
              isLastQuestion={isLastQuestion}
              onClick={handleContinue}
            />
          </div>
        )}
    </QuizWrapper>
  )
}

export default MultipleImageChoice
