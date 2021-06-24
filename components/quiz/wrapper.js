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
    question.required === true
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
    <AnimateSharedLayout>
      <div
        className={`${
          !nested ? 'flex-shrink-0' : ''
        } flex flex-col justify-between relative`}
      >
        {children}
        <AnimatePresence>
          {displayContinue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                nested ? 'absolute bottom-0 transform translate-y-32 z-20' : ''
              } py-8 mx-auto w-full flex items-center justify-center`}
            >
              <Continue
                isLastQuestion={isLastQuestion}
                onClick={handleContinue}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={`flex flex-col ${
            displayFinish ? 'justify-start' : 'justify-end'
          } flex-grow h-full`}
        >
          <AnimatePresence>
            {displaySkip ? (
              <motion.div
                layout
                layoutId="skip"
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full py-8"
              >
                <Tooltip
                  label="Skip and continue"
                  className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-sm shadow-sm"
                >
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex hover:scale-105 transform  items-center justify-center p-4 text-center text-gray-800 transition-all hover:shadow-xl duration-500 ease-in-out bg-white border rounded-full border-cool-gray-200 hover:text-gray-900"
                  >
                    <span className="sr-only">Skip and continue</span>
                    <i className=" gg-arrow-down" aria-hidden="true" />
                  </button>
                </Tooltip>
              </motion.div>
            ) : (
              <motion.div layout layoutId="skip" className="py-8" />
            )}
            {displayFinish && (
              <div
                className="flex items-center justify-center w-full pt-10 sm:pt-24"
                key="finish"
              >
                <Finish onClick={handleContinue} />
              </div>
            )}
            {displayFinish && quiz && <Feedback quiz={quiz} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimateSharedLayout>
  )
}
