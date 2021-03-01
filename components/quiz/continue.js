import {motion} from 'framer-motion'

export default function Continue({onClick, isDisabled, isLastQuestion}) {
  return (
    <motion.button
      layout
      className={`mt-3 px-5 py-3 rounded-md font-semibold ${
        isLastQuestion ? 'bg-black text-white' : 'bg-black text-white'
      } transition-colors ease-in-out duration-300 relative z-20`}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLastQuestion ? 'Finish' : 'Continue'}
    </motion.button>
  )
}
