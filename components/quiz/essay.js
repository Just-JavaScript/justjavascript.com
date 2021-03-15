import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'
import SubmitAndContinue from 'components/quiz/submitAndContinue'

const Essay = (props) => {
  const {
    question,
    state,
    handleContinue,
    handleSubmit,
    isDisabled,
    currentAnswer,
    isAnswered,
    handleSkip,
    number,
    isLastQuestion,
    currentQuestion,
    showExplanation,
    nested,
  } = props
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const explanation = question.answer?.description
  const isMDX = typeof question.prompt !== 'string'

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number} nested={nested}>
        {isMDX ? (
          <div className="prose prose-sans sm:prose-sans-lg max-w-none">
            {question.prompt}
          </div>
        ) : (
          <Markdown>{question.prompt}</Markdown>
        )}
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          {isAnswered ? (
            <motion.div>
              <Markdown className="rounded-md prose sm:prose-lg h-auto">
                {formik.values.value}
              </Markdown>
            </motion.div>
          ) : (
            <>
              {/* <label className="text-lg font-semibold" htmlFor="value">
                Your answer
              </label> */}
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-200 prose max-w-none rounded-md h-40"
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

          {explanation ? (
            <Submit
              isDisabled={isDisabled}
              isSubmitting={state.matches('answering')}
              explanation={explanation}
            />
          ) : (
            <SubmitAndContinue
              isLastQuestion={isLastQuestion}
              state={state}
              handleContinue={handleContinue}
              isDisabled={state.matches('answering')}
              isSubmitting={state.matches('answering')}
            />
          )}
        </form>
      </AnswerWrapper>
      <div>
        {/* <AnimatePresence> */}
        {showExplanation && (
          <Explanation className="max-h-full">{explanation}</Explanation>
        )}
        {/* </AnimatePresence> */}
      </div>
    </QuizWrapper>
  )
}

export default Essay
