import React from 'react'
import Tippy from '@tippyjs/react'
import Finish from 'components/quiz/finish'
import Continue from 'components/quiz/continue'
import Feedback from 'components/feedback'

export default function Wrapper({
  question,
  state,
  children,
  handleSkip,
  handleContinue,
  isLastQuestion,
  currentQuestion,
  nested,
  quiz,
}) {
  const displayContinue = nested
    ? !question.questions &&
      state.matches('answered') &&
      currentQuestion.id === question.id &&
      (question.answer?.description || question.correctChoices) &&
      !isLastQuestion
    : state.matches('answered') &&
      currentQuestion.id === question.id &&
      (question.answer?.description || question.correctChoices) &&
      !isLastQuestion

  const displaySkip =
    // !nested &&
    !displayContinue && question.questions
      ? currentQuestion.id === question.id && !isLastQuestion
      : !displayContinue &&
        currentQuestion.id === question.id &&
        !isLastQuestion &&
        !nested

  const displayFinish = question.questions
    ? isLastQuestion
    : question.required === true
    ? isLastQuestion && state.matches('answered') && !nested
    : isLastQuestion && !nested

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className={`${!nested ? '' : ''} flex flex-col relative `}>
        <div className="">{children}</div>
        <div
          className={`${
            displayContinue
              ? 'visible'
              : question.questions
              ? 'invisible hidden'
              : 'invisible hidden'
          } flex py-8 mx-auto w-full items-center justify-center`}
        >
          <Continue isLastQuestion={isLastQuestion} onClick={handleContinue} />
        </div>
        <div>
          {question.questions && (
            <div
              className={`${
                displaySkip ? 'visible' : 'invisible'
              } flex items-center justify-center w-full my-8`}
            >
              <Tippy
                content="Skip and continue"
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-sm shadow-sm"
              >
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex hover:scale-105 transform  items-center justify-center p-4 text-center text-gray-800 transition-all hover:shadow-xl duration-500 ease-in-out bg-white border rounded-full border-cool-gray-200 hover:text-gray-900"
                >
                  <span className="sr-only">Skip and continue</span>
                  <i className="gg-arrow-down" aria-hidden="true" />
                </button>
              </Tippy>
            </div>
          )}
          {displayFinish && (
            <div
              className="flex items-center justify-center w-full"
              key="finish"
            >
              <Finish onClick={handleContinue} />
            </div>
          )}
          {displayFinish && quiz && <Feedback quiz={quiz} />}
        </div>
      </div>
    </>
  )
}
