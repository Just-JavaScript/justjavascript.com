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
  const [output, setOutput] = React.useState([])

  function onChange(sketch) {
    setOutput(sketch)
  }

  React.useEffect(() => {
    formik.setValues({value: output})
    return () => {}
  }, [output])

  const explanation = question.answer?.description

  return (
    <QuizWrapper {...props}>
      <QuestionWrapper number={number}>
        <motion.div layout>
          <Markdown>{question.prompt}</Markdown>
        </motion.div>
        <AnimatePresence>
          {showExplanation && <Explanation>{explanation}</Explanation>}
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
