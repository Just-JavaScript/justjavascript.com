import {motion} from 'framer-motion'

export default function Continue({onClick, isDisabled, isLastQuestion}) {
  return (
    <motion.button
      layout
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className={`w-full mt-4 px-3 py-3 rounded-md font-semibold ${
        isLastQuestion
          ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-50'
      } transition-colors ease-in-out duration-300`}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLastQuestion ? 'Finish' : 'Next Question ↓'}
    </motion.button>
  )
}
