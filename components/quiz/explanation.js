import Markdown from 'components/quiz/markdown'
import {motion} from 'framer-motion'

export default function Explanation({children, label, className}) {
  return (
    <motion.div
      layout
      initial={{opacity: 0, height: '0%'}}
      animate={{opacity: 1, height: '100%'}}
      className={`bg-teal-100 md:mt-5 mt-3 relative z-0 md:p-8 p-5 flex space-x-3 md:rounded-lg border border-teal-200 overflow-y-auto ${
        className ? className : ''
      }`}
    >
      {/* <span
        className="inline-block text-2xl font-bold -ml-2 -mt-1"
        role="img"
        aria-label="bulb"
      >
        {label ? label : '💡'}
      </span> */}
      <Markdown>{children}</Markdown>
    </motion.div>
  )
}
