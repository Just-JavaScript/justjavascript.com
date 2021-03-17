import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import SubmitAndContinue from 'components/quiz/submitAndContinue'
import Excalidraw from 'components/excalidraw/excalidraw-iframe'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'
import {isEmpty} from 'lodash'

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
  const {formik} = useEggheadQuestion(question, handleSubmit)
  const options = {
    zenModeEnabled: true,
    viewBackgroundColor: '#f4f5f7',
  }
  const [output, setOutput] = React.useState()

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({value: output})
    return () => {}
  }, [output])

  const explanation = question.answer?.description
  const isMDX = typeof question.prompt !== 'string'

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
            user={{name: 'Excalidraw User'}}
            initialData={
              currentAnswer && {
                elements: JSON.parse(currentAnswer),
                scrollToCenter: true,
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
                  <Markdown className="p-3 mt-4">
                    {formik.values.comment}
                  </Markdown>
                ) : (
                  <>
                    <textarea
                      className="w-full p-3 bg-cool-gray-100 border border-gray-200 prose prose-sans max-w-none rounded-md h-24 mt-4"
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
          {formik.submitCount > 0 && formik.errors.value}
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
