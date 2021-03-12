import React from 'react'
import {Element as ScrollElement} from 'react-scroll'
import AnswerWrapper from 'components/quiz/answerWrapper'
import QuizWrapper from 'components/quiz/wrapper'
import QuestionToShow from 'components/quiz/questionToShow'
import {get, first, filter, last, find, isEmpty, indexOf} from 'lodash'
import {scroller} from 'react-scroll'
import {motion} from 'framer-motion'
import useEggheadQuiz from 'hooks/useEggheadQuiz'
import Continue from 'components/quiz/continue'
import Markdown from 'components/quiz/markdown'
import {
  GetUserAnswerFromLocalStorage,
  StoreUserAnswerInLocalStorage,
} from 'utils/quiz-answers-in-local-storage'

const MultipleQuestions = (props) => {
  const parentQuestion = props.question
  const isMDX = typeof parentQuestion.prompt !== 'string'

  const ids = parentQuestion.questions.map((q) => q.id)
  // Get answered questions in current quiz
  const completedQuestions = filter(ids, (id) =>
    GetUserAnswerFromLocalStorage(id)
  )

  // Start from the last answered question
  const defaultCurrentQuestionId = !isEmpty(completedQuestions)
    ? get(find(parentQuestion.questions, {id: last(completedQuestions)}), 'id')
    : get(first(get(parentQuestion, 'questions')), 'id')

  const defaultCurrentQuestionIndex =
    indexOf(ids, defaultCurrentQuestionId) || 0

  const [currentQuestion, setCurrentQuestion] = React.useState({
    id: defaultCurrentQuestionId,
    index: defaultCurrentQuestionIndex,
  })

  // check whether all nested questions has been answered
  // if so, mark parent question as answered

  const parentQuestionId = get(parentQuestion, 'id')

  const answeredQuestions = parentQuestion.questions.map((question) => {
    return !isEmpty(GetUserAnswerFromLocalStorage(question.id))
  })

  const isParentQuestionAnswered = answeredQuestions.every((q) => q === true)

  function checkIfParentQuestionIsCompleted() {
    isParentQuestionAnswered && StoreUserAnswerInLocalStorage(parentQuestionId)
  }

  checkIfParentQuestionIsCompleted()

  return (
    <QuizWrapper {...props}>
      <div className="md:py-8 py-8">
        <div className="mb-4 sm:px-0 px-5">
          <span className="mr-2 p-2 rounded-full w-6 h-6 text-xs lining-nums font-bold inline-flex justify-center items-center bg-black text-white font-mono">
            {props.number}
          </span>
        </div>
        {parentQuestion.prompt &&
          (isMDX ? (
            <div className="prose max-w-none">{parentQuestion.prompt}</div>
          ) : (
            <Markdown>{parentQuestion.prompt}</Markdown>
          ))}
        <div className="flex flex-col justify-start space-y-3">
          {parentQuestion.questions.map((question, index) => {
            const {
              state,
              handleSkip,
              isAnswered,
              isDisabled,
              handleSubmit,
              currentAnswer,
              isLastQuestion,
              showExplanation,
              number,
              nextQuestionId,
              nextQuestionIdx,
            } = useEggheadQuiz(parentQuestion, question, setCurrentQuestion)

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
              <div key={question.id + '-nested'} className="relative">
                <ScrollElement name={question.id} />
                {index <= currentQuestion.index && (
                  <>
                    <AnswerWrapper className="w-full flex flex-col md:p-4 p-3 md:rounded-lg bg-cool-gray-100 border border-cool-gray-100">
                      <QuestionToShow
                        nested
                        question={question}
                        // number={`${number}`}
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
                    {/* {displayContinue && (
                      <motion.div
                        layout
                        className="py-3 flex items-center justify-center w-full"
                      >
                        <Continue onClick={props.handleContinue} />
                      </motion.div>
                    )} */}
                    {!displayContinue && !isLastQuestion && (
                      <div className="z-10 absolute left-0 bottom-0 w-full flex items-center justify-center transform translate-y-11">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
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
