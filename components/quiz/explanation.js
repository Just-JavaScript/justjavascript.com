import Markdown from 'components/quiz/markdown'
import {motion} from 'framer-motion'

export default function Explanation({children, label, className}) {
  return (
    <motion.div
      layout
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className={`mt-2 bg-orange-50 p-5 rounded-md max-h-80 overflow-y-auto ${
        className ? className : ''
      }`}
    >
      <h1
        className="block text-2xl font-serif pb-3 font-bold"
        role="img"
        aria-label="bulb"
      >
        {label ? label : '💡 Answer'}
      </h1>
      <Markdown>{children}</Markdown>
    </motion.div>
  )
}
