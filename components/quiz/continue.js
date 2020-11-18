import {motion} from 'framer-motion'

export default function Continue({onClick, isDisabled, isLastQuestion}) {
  return (
    <motion.button
      layout
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className={`mt-3 px-5 py-3 rounded-md font-semibold ${
        isLastQuestion
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
      } transition-colors ease-in-out duration-300 relative z-20`}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLastQuestion ? 'Finish' : 'Continue'}
    </motion.button>
  )
}
