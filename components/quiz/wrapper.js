import Tooltip from '@reach/tooltip'
import Finish from 'components/quiz/finish'
import Continue from 'components/quiz/continue'
import {AnimateSharedLayout, AnimatePresence, motion} from 'framer-motion'

export default function Wrapper({
  question,
  state,
  children,
  handleSkip,
  handleContinue,
  isLastQuestion,
  currentQuestion,
  nested,
}) {
  const displayContinue =
    currentQuestion.id === question.id &&
    state.matches('answered') &&
    (question.answer?.description || question.correctChoices) &&
    !isLastQuestion

  const displaySkip =
    !nested &&
    !displayContinue &&
    currentQuestion.id === question.id &&
    !isLastQuestion

  const displayFinish =
    !nested &&
    (question.required === true
      ? isLastQuestion && state.matches('answered')
      : isLastQuestion)

  return (
    <AnimateSharedLayout>
      <div
        className={`${
          !nested ? 'min-h-screen' : ''
        } flex flex-col justify-between relative`}
      >
        {children}
        <AnimatePresence>
          {displayContinue && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
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
        {!displayContinue && !displaySkip && !nested && (
          <div className="py-16" />
        )}
        <motion.div className="flex-grow h-full flex flex-col justify-end">
          <AnimatePresence>
            {displaySkip && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="w-full flex items-center justify-center py-16"
              >
                <Tooltip
                  label="Next question"
                  className="px-3 py-2 border border-gray-200 bg-white shadow-sm rounded-sm text-sm"
                >
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-10 h-10 rounded-full bg-white border border-cool-gray-200 flex items-center justify-center text-center text-gray-500 hover:text-gray-900 ease-in-out transition-colors duration-150"
                  >
                    ↓
                  </button>
                </Tooltip>
              </motion.div>
            )}
            {!displaySkip && !displayContinue && <div />}
          </AnimatePresence>
        </motion.div>
        {displayFinish && (
          <div className="w-full flex items-center justify-center py-16">
            <Finish onClick={handleContinue} />
          </div>
        )}
      </div>
    </AnimateSharedLayout>
  )
}
