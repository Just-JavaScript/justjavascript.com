import React from 'react'
import QuestionWrapper from 'components/quiz/question-wrapper'
import AnswerWrapper from 'components/quiz/answer-wrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import SubmitAndContinue from 'components/quiz/submit-and-continue'
import Excalidraw from 'components/excalidraw/excalidraw'
import useEggheadQuestion from 'hooks/use-egghead-question'
import { motion, AnimatePresence } from 'framer-motion'
import { isEmpty } from 'lodash'

const Sketch = (props) => {
  const {
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
    number,
  } = props
  const { formik } = useEggheadQuestion(question, handleSubmit)
  const options = {
    zenModeEnabled: true,
    viewBackgroundColor: '#f4f5f7',
  }
  const [output, setOutput] = React.useState()

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({ value: output, comment: formik.values.comment })
    return () => {}
  }, [output])

  const explanation = question.answer?.description
  const isMDX = typeof question.prompt !== 'string'

  const currentAnswerParsed = JSON.parse(currentAnswer)

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number}>
        <motion.div layout>
          {isMDX ? (
            <div className="prose prose-sans max-w-none">{question.prompt}</div>
          ) : (
            <Markdown>{question.prompt}</Markdown>
          )}
        </motion.div>
      </QuestionWrapper>
      <AnswerWrapper>
        <form
          className="flex flex-col items-start"
          onSubmit={formik.handleSubmit}
        >
          <Excalidraw
            onChange={(sketch) => onChange(sketch)}
            options={options}
            user={{ name: 'Excalidraw User' }}
            initialData={
              currentAnswerParsed && {
                elements: currentAnswerParsed?.value
                  ? currentAnswerParsed.value
                  : currentAnswerParsed,
                scrollToContent: true,
              }
            }
          />
          <div className="w-full">
            {question.canComment === true && (
              <>
                <label htmlFor="comment" className="block mt-2">
                  {question.commentPrompt && (
                    <Markdown>{question.commentPrompt}</Markdown>
                  )}
                </label>
                {state.matches('answered') ? (
                  <div className="p-3 mt-4">
                    <div className="font-bold">Your answer</div>
                    <Markdown className="pt-2 prose prose-sans">
                      {currentAnswerParsed.comment}
                    </Markdown>
                  </div>
                ) : (
                  <>
                    <textarea
                      className="w-full h-24 p-3 mt-4 bg-gray-100 border border-gray-200 rounded-md max-w-none focus:border-orange-500 focus:outline-none focus:ring-0"
                      disabled={isDisabled}
                      id="comment"
                      name="comment"
                      placeholder="Write your answer..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    />
                    {formik.submitCount > 0 && formik.errors.comment}
                  </>
                )}
              </>
            )}
          </div>
          {explanation ? (
            <Submit
              isDisabled={isDisabled}
              isSubmitting={state.matches('answering')}
              explanation={explanation}
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
          {formik.submitCount > 0 && (
            <div className="pt-3">{formik.errors.value}</div>
          )}
        </form>
        {/* <AnimatePresence>
          {explanation && state.matches('answered') && (
            <Continue
              isLastQuestion={isLastQuestion}
              onClick={handleContinue}
            />
          )}
        </AnimatePresence> */}
      </AnswerWrapper>
      <AnimatePresence>
        <div>{showExplanation && <Explanation>{explanation}</Explanation>}</div>
      </AnimatePresence>
    </QuizWrapper>
  )
}

export default Sketch
