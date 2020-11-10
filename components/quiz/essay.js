import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'

const Essay = ({
  question,
  state,
  handleContinue,
  handleSkip,
  isDisabled,
  handleSubmit,
  currentAnswer,
  number,
  isLastQuestion,
  // showExplanation,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
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
          {showExplanation ? (
            <motion.div>
              <Markdown className="rounded-md prose h-auto">
                {formik.values.value}
              </Markdown>
            </motion.div>
          ) : (
            <>
              {/* <label className="text-lg font-semibold" htmlFor="value">
                Your answer
              </label> */}
              <textarea
                className="w-full p-3 bg-cool-gray-100 border border-gray-200 prose rounded-md h-40"
                disabled={isDisabled}
                name="value"
                placeholder="Type your answer here..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.value}
              />
            </>
          )}

          <AnimatePresence>
            {formik.submitCount > 0 && formik.errors.value && (
              <motion.span
                className="mt-3"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
              >
                {formik.errors.value}
              </motion.span>
            )}
          </AnimatePresence>
          <Submit
            isDisabled={isDisabled}
            isSubmitting={state.matches('answering')}
            explanation={question.explanation}
          />
        </form>
      </AnswerWrapper>
      <AnimatePresence>
        {showExplanation && (
          <Explanation className="max-h-full">
            {question.explanation}
          </Explanation>
        )}
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

export default Essay
