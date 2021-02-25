import {jsx} from '@emotion/react'
import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'

const Answer = ({
  children,
  title = 'Answer',
  byline = 'Don’t reveal until you have finished writing.',
  action = 'Reveal Answer',
  className,
}) => {
  const [isShown, setShown] = React.useState(false)

  return (
    <div className={className}>
      <div className="relative flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <AnimatePresence>
          {!isShown && (
            <motion.div
              className="absolute z-10 flex flex-col items-center"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1, type: 'spring'}}
            >
              <div className="font-sans text-2xl font-semibold">{title}</div>
              <div className="mb-4">{byline}</div>
              <button
                className="leading-8 px-5 py-3 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 ease-in-out text-white"
                onClick={() => setShown(!isShown)}
              >
                {action}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{
            filter: 'blur(8px)',
          }}
          animate={{
            filter: isShown ? 'blur(0px)' : 'blur(8px)',
          }}
          transition={{duration: 2, type: 'spring'}}
          css={{
            'img, pre, .gif_player': {
              display: isShown ? 'inherit' : 'none',
            },
          }}
          className={!isShown ? `max-h-96 overflow-hidden w-full` : `w-full`}
        >
          <div className="text-xl font-bold">Answer</div>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default Answer
