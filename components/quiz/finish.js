import {motion} from 'framer-motion'

export default function Finish({onClick, isLastQuestion}) {
  return isLastQuestion ? (
    <motion.button
      layout
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="w-full mt-4 px-3 py-3 rounded-md font-semibold bg-teal-500 hover:bg-teal-600 text-white transition-colors ease-in-out duration-300"
      type="button"
      onClick={onClick}
    >
      Finish
    </motion.button>
  ) : null
}
