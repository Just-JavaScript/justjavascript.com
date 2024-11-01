import React from 'react'
import { motion } from 'framer-motion'

export default function SubmitAndContinue({
  state,
  handleContinue,
  isDisabled,
  isSubmitting,
}) {
  return state.matches('answered') ? null : (
    <motion.button
      layout
      className={`w-full relative hover:shadow-xl hover:bg-gray-600 z-20 mt-4 px-3 py-3 flex items-center justify-center rounded-md font-semibold transition-all ease-in-out duration-300 focus:ring focus:outline-none focus:ring-orange-500 ${
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
        <>
          <span className="sr-only">Sending answer</span>
          <svg
            aria-hidden="true"
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <motion.g
              animate={{ rotateZ: [0, 360] }}
              transition={{ repeat: Infinity }}
              fill="currentColor"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z"></path>
            </motion.g>
          </svg>
        </>
      ) : (
        'Send Answer'
      )}
    </motion.button>
  )
}
