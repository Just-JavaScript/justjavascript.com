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
  currentQuestionIdx,
  isLastQuestion,
  showExplanation,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)

  console.log(formik)

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
        <AnimatePresence>
          {showExplanation && (
            <Explanation className="max-h-full">
              {question.explanation}
            </Explanation>
          )}
        </AnimatePresence>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          {currentAnswer ? (
            <motion.div>
              <div className="text-lg font-semibold">Your answer</div>
              <Markdown className="p-3 h-auto font-semibold">
                {currentAnswer.value}
              </Markdown>
            </motion.div>
          ) : (
            <>
              <label className="text-lg font-semibold" htmlFor="value">
                Your answer
              </label>
              <textarea
                className="w-full p-3 bg-gray-100 prose rounded-md h-40"
                disabled={isDisabled}
                name="value"
                placeholder="Type your answer here..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.value}
              />
            </>
          )}
          {formik.submitCount > 0 && formik.errors.value}
          <Submit
            isDisabled={isDisabled}
            isSubmitting={state.matches('answering')}
            explanation={question.explanation}
          />
        </form>
        <AnimatePresence>
          {state.matches('answered') && (
            <Continue
              isLastQuestion={isLastQuestion}
              onClick={handleContinue}
            />
          )}
        </AnimatePresence>
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default Essay
