import React from 'react'
import {Element as ScrollElement} from 'react-scroll'
import AnswerWrapper from 'components/quiz/answer-wrapper'
import QuizWrapper from 'components/quiz/wrapper'
import QuestionToShow from 'components/quiz/question-to-show'
import {get, first, filter, last, find, isEmpty, indexOf} from 'lodash'
import {scroller} from 'react-scroll'
import useEggheadQuiz from 'hooks/use-egghead-quiz'
import Continue from 'components/quiz/continue'
import Markdown from 'components/quiz/markdown'
import {
  getUserAnswerFromLocalStorage,
  storeUserAnswerInLocalStorage,
} from 'utils/quiz-answers-in-local-storage'

const MultipleQuestions = (props) => {
  const parentQuestion = props.question
  const isMDX = typeof parentQuestion.prompt !== 'string'
  const ids = parentQuestion.questions.map((q) => q.id)

  // Get answered questions in current quiz
  const completedQuestions = filter(ids, (id) =>
    getUserAnswerFromLocalStorage(id)
  )

  // Start from last answered question
  // todo: might actually want to start from the question after that
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
  // if so, consider the parent question as answered

  const parentQuestionId = get(parentQuestion, 'id')

  const answeredQuestions = parentQuestion.questions.map((question) => {
    return !isEmpty(getUserAnswerFromLocalStorage(question.id))
  })

  const isParentQuestionAnswered = answeredQuestions.every((q) => q === true)
  isParentQuestionAnswered && storeUserAnswerInLocalStorage(parentQuestionId)

  return (
    <QuizWrapper {...props}>
      <div className="py-8 md:py-8">
        <div className="px-5 mb-4 sm:px-0">
          <span className="inline-flex items-center justify-center w-6 h-6 p-2 mr-2 font-mono text-xs font-bold text-white bg-black rounded-full lining-nums">
            {props.number}
          </span>
        </div>
        {parentQuestion.prompt &&
          (isMDX ? (
            <div className="prose prose-sans max-w-none">
              {parentQuestion.prompt}
            </div>
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
                    <AnswerWrapper className="flex flex-col w-full p-3 border md:p-4 md:rounded-lg bg-cool-gray-100 border-cool-gray-100">
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
                        className="flex items-center justify-center w-full py-3"
                      >
                        <Continue onClick={props.handleContinue} />
                      </motion.div>
                    )} */}
                    {!displayContinue && !isLastQuestion && (
                      <div className="absolute bottom-0 left-0 z-10 flex items-center justify-center w-full transform translate-y-11">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                          <div className="w-px h-16 p-px bg-white" />
                          <div className="w-2 h-2 bg-white rounded-full" />
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
