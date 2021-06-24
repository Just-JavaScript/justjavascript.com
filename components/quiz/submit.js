import { motion } from 'framer-motion'

export default function Submit({ isDisabled, isSubmitting }) {
  if (isDisabled && !isSubmitting) {
    return null
  }
  return (
    <motion.button
      layout
      className="flex items-center hover:shadow-xl justify-center w-full px-3 py-3 mt-4 font-semibold text-white transition-all duration-300 ease-in-out bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-orange-500"
      type="submit"
      disabled={isDisabled}
    >
      {isSubmitting ? (
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
        `Send Answer`
      )}
    </motion.button>
  )
}
