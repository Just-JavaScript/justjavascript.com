import React from 'react'
import dynamic from 'next/dynamic'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'
import {useToggle, useWindowSize} from 'react-use'
import {Dialog} from '@reach/dialog'

const ExcalidrawWithoutSSR = dynamic(() => import('excalidraw'), {
  ssr: false,
})

const Sketch = ({
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
  const options = {
    zenModeEnabled: true,
    viewBackgroundColor: '#f4f5f7',
  }
  const [output, setOutput] = React.useState([])
  const [showExcalidraw, setShowExcalidraw] = useToggle(false)
  const {width, height} = useWindowSize()

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({value: output})
    return () => {}
  }, [output])

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
          <div className="relative">
            <form
              className="absolute z-10 left-0 top-0"
              onSubmit={formik.handleSubmit}
            >
              {/* TODO: Figure out a fix for excalidraw embed on scrolling page, 
              as mouse position in canvas gets wonky due to it's fixed positioning */}
              <Dialog
                style={{width: width, marginTop: '25%'}}
                isOpen={showExcalidraw}
                onDismiss={setShowExcalidraw}
              >
                <ExcalidrawWithoutSSR
                  width={width} // 900 // Todo: mobile
                  height={height - height * 0.25} // 600
                  onChange={(sketch) => onChange(sketch)}
                  options={options}
                  user={{name: 'Excalidraw User'}}
                  initialData={currentAnswer ? currentAnswer.value : output}
                />

                <div
                  style={{height: '25%'}}
                  className="fixed w-full top-0 left-0 flex items-center justify-center bg-white p-8"
                >
                  <Markdown>{question.text}</Markdown>
                  <button
                    className="absolute top-5 right-5 p-2"
                    type="button"
                    onClick={setShowExcalidraw}
                  >
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
                  </button>
                </div>
              </Dialog>
              <button
                type="button"
                onClick={setShowExcalidraw}
                className="bg-indigo-500 text-white px-5 py-3 rounded-md hover:bg-indigo-600 transition-colors ease-in-out duration-150"
              >
                Start Sketching
              </button>
            </form>
          </div>
        </motion.div>
        <AnimatePresence>
          {showExplanation && <Explanation>{question.explanation}</Explanation>}
        </AnimatePresence>
      </QuestionWrapper>
      <AnswerWrapper>
        <form
          className="flex flex-col items-start"
          onSubmit={formik.handleSubmit}
        >
          <Submit
            isDisabled={isDisabled}
            isSubmitting={state.matches('answering')}
            explanation={question.explanation}
          />
          {formik.submitCount > 0 && formik.errors.value}
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

export default Sketch
