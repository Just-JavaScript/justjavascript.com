import React from 'react'
import QuestionWrapper from 'components/quiz/question-wrapper'
import AnswerWrapper from 'components/quiz/answer-wrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import useEggheadQuestion from 'hooks/use-egghead-question'
import SubmitAndContinue from 'components/quiz/submit-and-continue'

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
  const { formik } = useEggheadQuestion(question, handleSubmit)
  const explanation = question.answer?.description
  const isMDX = typeof question.prompt !== 'string'
  const [mounted, setMounted] = React.useState(false)

  const questionRef = React.useRef()
  React.useEffect(() => {
    setMounted(true)
    questionRef?.current?.focus({ preventScroll: true })
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div ref={questionRef} tabIndex={-1}>
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
              <div>
                <div className="pb-2 lg:text-xl sm:text-lg font-semibold">
                  Your answer
                </div>
                <Markdown className="min-h-[10rem] prose sm:prose-lg rounded-md  whitespace-pre-wrap">
                  {formik.values.value}
                </Markdown>
              </div>
            ) : (
              <>
                <label className="pb-2 text-lg font-semibold" htmlFor="value">
                  Your answer
                </label>
                <textarea
                  className="sm:text-lg w-full h-40 p-3 prose border border-gray-200 rounded-md bg-gray-50 prose-sans max-w-none focus:shadow-outline-orange focus:ring-orange-500 focus:border-transparent"
                  disabled={isDisabled}
                  name="value"
                  placeholder="Type your answer here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.value}
                />
              </>
            )}

            {formik.submitCount > 0 && formik.errors.value && (
              <span className="mt-3">{formik.errors.value}</span>
            )}

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
        {showExplanation && (
          <Explanation className="max-h-full">{explanation}</Explanation>
        )}
      </QuizWrapper>
    </div>
  )
}

export default Essay
