import React from 'react'
import QuestionWrapper from 'components/quiz/questionWrapper'
import AnswerWrapper from 'components/quiz/answerWrapper'
import Explanation from 'components/quiz/explanation'
import QuizWrapper from 'components/quiz/wrapper'
import Markdown from 'components/quiz/markdown'
import Submit from 'components/quiz/submit'
import Continue from 'components/quiz/continue'
import Excalidraw from 'components/excalidraw/excalidraw-iframe'
import useEggheadQuestion from 'hooks/useEggheadQuestion'
import {motion, AnimatePresence} from 'framer-motion'

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
  const [output, setOutput] = React.useState([])

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({value: output})
    return () => {}
  }, [output])

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number}>
        <motion.div layout>
          <Markdown>{question.text}</Markdown>
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
          <Excalidraw
            onChange={(sketch) => onChange(sketch)}
            options={options}
            user={{name: 'Excalidraw User'}}
            initialData={currentAnswer ? currentAnswer.value : output}
          />
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
