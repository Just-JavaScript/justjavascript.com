import React from 'react'
import {Element as ScrollElement} from 'react-scroll'
import AnswerWrapper from 'components/quiz/answerWrapper'
import QuizWrapper from 'components/quiz/wrapper'
import QuestionToShow from 'components/quiz/questionToShow'
import {get, first} from 'lodash'
import useEggheadQuiz from 'hooks/useEggheadQuiz'
import Continue from 'components/quiz/continue'
import {scroller} from 'react-scroll'
import Markdown from 'components/quiz/markdown'
import {motion, AnimatePresence} from 'framer-motion'

const MultipleQuestions = (props) => {
  const [currentQuestion, setCurrentQuestion] = React.useState({
    index: 0,
    id: get(first(get(props.question, 'questions')), 'id'),
  })

  const quiz = props.question

  return (
    <QuizWrapper {...props}>
      <div className="md:py-8 py-8">
        <div className="mb-4">
          <span className="mr-2 p-2 rounded-full w-6 h-6 text-xs lining-nums font-bold inline-flex justify-center items-center bg-indigo-100 text-indigo-800">
            {props.number}
          </span>
        </div>
        {quiz.text && <Markdown className="mb-4">{quiz.text}</Markdown>}
        <div className="flex flex-col justify-start space-y-3">
          {props.question.questions.map((question, index) => {
            const {
              state,
              handleSkip,
              isAnswered,
              isDisabled,
              handleSubmit,
              currentAnswer,
              handleContinue,
              isLastQuestion,
              showExplanation,
              handleShowNextQuestion,
              number,
              nextQuestionId,
              nextQuestionIdx,
            } = useEggheadQuiz(quiz, question, setCurrentQuestion)

            const displayContinue =
              isLastQuestion &&
              (question.required !== false
                ? state.matches('answered')
                : state.matches('idle')) &&
              props.currentQuestion.id === props.question.id

            function scrollTo(question) {
              scroller.scrollTo(question, {
                smooth: 'easeInOutQuart',
                delay: 100,
                duration: 900,
                ignoreCancelEvents: true,
              })
            }

            return (
              <div key={question.id} className="relative" key={question.id}>
                <ScrollElement name={question.id} />
                {index <= currentQuestion.index && (
                  <>
                    <AnswerWrapper className="w-full flex flex-col md:p-4 p-3 md:rounded-lg bg-cool-gray-100 border border-cool-gray-100">
                      <QuestionToShow
                        nested
                        question={question}
                        number={`${props.number}.${number}`}
                        currentAnswer={currentAnswer}
                        isLastQuestion={isLastQuestion}
                        state={state}
                        handleSubmit={handleSubmit}
                        handleContinue={() => {
                          if (isLastQuestion) {
                            props.setCurrentQuestion({
                              id: props.nextQuestionId,
                              index: props.nextQuestionIdx,
                            })
                            scrollTo(props.nextQuestionId)
                          } else {
                            setCurrentQuestion({
                              id: nextQuestionId,
                              index: nextQuestionIdx,
                            })
                            scrollTo(nextQuestionId)
                          }
                        }}
                        isDisabled={isDisabled}
                        handleSkip={handleSkip}
                        showExplanation={showExplanation}
                        isAnswered={isAnswered}
                        currentQuestion={currentQuestion}
                      />
                    </AnswerWrapper>
                    {/* <AnimatePresence> */}
                    {displayContinue && (
                      <motion.div
                        layout
                        // initial={{opacity: 0}}
                        // animate={{opacity: 1}}
                        // exit={{opacity: 0}}
                        className="py-3 flex items-center justify-center w-full"
                      >
                        <Continue onClick={props.handleContinue} />
                      </motion.div>
                    )}
                    {/* </AnimatePresence> */}
                    {!displayContinue && !isLastQuestion && (
                      <div className="z-10 absolute left-0 bottom-0 w-full flex items-center justify-center transform translate-y-11">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                          {/* bg-gradient-to-b to-cool-gray-100 via-cool-gray-300 from-cool-gray-100 */}
                          <div className="w-px p-px h-16 bg-white" />
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </QuizWrapper>
  )
}

export default MultipleQuestions
