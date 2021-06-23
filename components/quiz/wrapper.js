import React from 'react'
import Tooltip from '@reach/tooltip'
import Finish from 'components/quiz/finish'
import Continue from 'components/quiz/continue'
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion'
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
  const displayContinue =
    !nested &&
    state.matches('answered') &&
    currentQuestion.id === question.id &&
    (question.answer?.description || question.correctChoices) &&
    !isLastQuestion

  const displaySkip =
    // !nested &&
    question.questions &&
    !displayContinue &&
    currentQuestion.id === question.id &&
    !isLastQuestion

  const displayFinish =
    // !nested &&
    question.questions &&
    (question.required === true
      ? isLastQuestion && state.matches('answered')
      : isLastQuestion)

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimateSharedLayout>
      <div
        className={`${
          !nested ? 'flex-shrink-0' : ''
        } flex flex-col justify-between relative`}
      >
        {children}
        <AnimatePresence>
          <div>
            {displayContinue && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${
                  nested
                    ? 'absolute bottom-0 transform translate-y-32 z-20'
                    : ''
                } py-8 mx-auto w-full flex items-center justify-center`}
              >
                <Continue
                  isLastQuestion={isLastQuestion}
                  onClick={handleContinue}
                />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
        {!displayContinue && !displaySkip && !nested && (
          <div className="py-16" />
        )}
        <motion.div
          className={`flex flex-col ${
            displayFinish ? 'justify-start' : 'justify-end'
          } flex-grow h-full`}
        >
          <AnimatePresence>
            {displaySkip && (
              <motion.div
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full py-16"
              >
                <Tooltip
                  label="Skip and continue"
                  className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-sm shadow-sm"
                >
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex items-center justify-center p-4 text-center text-gray-800 transition-colors duration-150 ease-in-out bg-white border rounded-full border-cool-gray-200 hover:text-gray-900"
                  >
                    <span className="sr-only">Skip and continue</span>
                    <i className=" gg-arrow-down" aria-hidden="true" />
                  </button>
                </Tooltip>
              </motion.div>
            )}
            {!displaySkip && !displayContinue && <div key="empty" />}
            {displayFinish && <Feedback quiz={quiz} />}
            {displayFinish && (
              <div
                className="flex items-center justify-center w-full py-10 sm:py-16"
                key="finish"
              >
                <Finish onClick={handleContinue} />
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimateSharedLayout>
  )
}
