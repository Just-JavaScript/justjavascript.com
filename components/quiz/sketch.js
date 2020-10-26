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
    // zenModeEnabled: true,
    viewBackgroundColor: '#f4f5f7',
  }
  const [output, setOutput] = React.useState([])
  const [isOpen, setOpen] = React.useState(false)

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({value: output})
    return () => {}
  }, [output])

  return (
    <QuizWrapper handleSkip={isLastQuestion ? false : handleSkip}>
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
              <ExcalidrawWithoutSSR
                width={960} // Todo: mobile
                height={620}
                onChange={(sketch) => onChange(sketch)}
                options={options}
                user={{name: 'Excalidraw User'}}
                initialData={currentAnswer ? currentAnswer.value : output}
              />
            </form>
          </div>
        </motion.div>
        <AnimatePresence>
          {showExplanation && <Explanation>{question.explanation}</Explanation>}
        </AnimatePresence>
      </QuestionWrapper>
      <AnswerWrapper>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
