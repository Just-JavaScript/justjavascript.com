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
import {isEmpty} from 'lodash'
import {motion, AnimatePresence} from 'framer-motion'

const MultipleChoice = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  currentAnswer,
  handleSkip,
  currentQuestionIdx,
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
    >
      <QuestionWrapper>
        <motion.div layout>
          <div className="mb-1">
            <span className="mr-2 p-2 rounded-full w-6 h-6 text-xs font-bold inline-flex justify-center items-center bg-indigo-100 text-indigo-800">
              {currentQuestionIdx + 1}
            </span>
          </div>
          <Markdown>{question.text}</Markdown>
        </motion.div>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div role="group" aria-labelledby="choices">
            <div className="text-lg font-semibold">Your answer</div>
            <AnimatePresence>
              {state.matches('answered') && question.correctAnswer && (
                <motion.div
                  layout
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="pt-4 font-xl font-semibold"
                >
                  {hasAnsweredCorrectly ? '🎉 Correct!' : 'Incorrect'}
                </motion.div>
              )}
            </AnimatePresence>
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
                      {currentAnswer &&
                        (state.matches('answered') || question.value) &&
                        question.correctAnswer &&
                        (correctAnswer
                          ? '✅'
                          : formik.values.value === choice.value && '❌')}
                    </label>
                  </div>
                )
              })}
          </div>
          {formik.errors.value}

          <AnimatePresence>
            {showExplanation && (
              <Explanation>{question.explanation}</Explanation>
            )}
          </AnimatePresence>
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
        {state.matches('answered') &&
          (question.explanation || question.correctAnswer) && (
            <Continue
              isLastQuestion={isLastQuestion}
              onClick={handleContinue}
            />
          )}
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default MultipleChoice
