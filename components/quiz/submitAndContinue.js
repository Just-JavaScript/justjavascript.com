import React from 'react'
import {motion} from 'framer-motion'
import {getUserAnswerFromLocalStorage} from 'utils/quiz-answers-in-local-storage'
import {isEmpty} from 'lodash'

export default function SubmitAndContinue({
  state,
  handleContinue,
  isDisabled,
  isSubmitting,
}) {
  React.useEffect(() => {
    // todo: fix this
    // state.matches('answered') &&
    //   isEmpty(getUserAnswerFromLocalStorage(state.currrentQuestionId)) &&
    //   handleContinue()
  }, [state])

  return state.matches('answered') ? null : (
    <motion.button
      layout
      className={`w-full relative z-20 mt-4 px-3 py-3 flex items-center justify-center rounded-md font-semibold transition-colors ease-in-out duration-300 ${
        state.matches('answered')
          ? 'bg-gray-100 text-black'
          : 'bg-black text-white'
      }`}
      type="submit"
      disabled={isDisabled}
    >
      {state.matches('answered') ? (
        'Next Question ↓'
      ) : isSubmitting ? (
        <svg
          className="text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <motion.g
            animate={{rotateZ: [0, 360]}}
            transition={{repeat: Infinity}}
            fill="currentColor"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z"></path>
          </motion.g>
        </svg>
      ) : (
        'Submit and continue'
      )}
    </motion.button>
  )
}
