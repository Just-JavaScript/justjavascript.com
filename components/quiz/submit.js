import {motion} from 'framer-motion'

export default function Submit({isDisabled, isSubmitting}) {
  if (isDisabled && !isSubmitting) {
    return null
  }
  return (
    <motion.button
      layout
      className="w-full mt-4 px-3 py-3 flex items-center justify-center rounded-md font-semibold bg-black text-white hover:bg-gray-900 transition-colors ease-in-out duration-300"
      type="submit"
      disabled={isDisabled}
    >
      {isSubmitting ? (
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
        `Send Answer`
      )}
    </motion.button>
  )
}
