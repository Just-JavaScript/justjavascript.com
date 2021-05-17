import React from 'react'
import QuestionWrapper from 'components/quiz/question-wrapper'
import AnswerWrapper from 'components/quiz/answer-wrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import useEggheadQuestion from 'hooks/use-egghead-question'
import Markdown from 'components/quiz/markdown'
import SubmitAndContinue from 'components/quiz/submit-and-continue'
import {motion, AnimatePresence} from 'framer-motion'
import HiddenAnswer from 'components/mdx/hidden-answer'

const Theater = ({
  question,
  state,
  handleContinue,
  handleSubmit,
  isDisabled,
  handleSkip,
  number,
  isLastQuestion,
}) => {
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const [showExplanation, setShowExplanation] = React.useState(
    question?.value ? true : false
  )

  return (
    <QuizWrapper
      handleSkip={isLastQuestion ? false : handleSkip}
      handleContinue={handleContinue}
    >
      <QuestionWrapper number={number}>
        <Markdown>{question.prompt}</Markdown>
        <HiddenAnswer
          title="Correct Answer"
          byline=""
          action="Reveal"
          className="mt-4"
        >
          <div className="py-10">{question.answer.description}</div>
        </HiddenAnswer>
      </QuestionWrapper>
      <AnswerWrapper>
        <form
          className="flex flex-col items-start"
          onSubmit={formik.handleSubmit}
        >
          <>
            {/* {answerOpened && question.answer.description && question.answer.description} */}
            <div className="text-lg font-semibold">Did you remember?</div>
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
                  value={'0'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '0'}
                  className="mr-1"
                />
                No
              </label>
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value={'1'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '1'}
                  className="mr-1"
                />
                Almost
              </label>
              <label>
                <input
                  disabled={isDisabled}
                  type="radio"
                  name="value"
                  value={'2'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.value === '2'}
                  className="mr-1"
                />
                Yes
              </label>
            </div>
            {formik.errors.value}
            <SubmitAndContinue
              isLastQuestion={isLastQuestion}
              state={state}
              handleContinue={handleContinue}
              isDisabled={state.matches('answering')}
              isSubmitting={state.matches('answering')}
            />
          </>
        </form>
      </AnswerWrapper>
    </QuizWrapper>
  )
}

export default Theater
