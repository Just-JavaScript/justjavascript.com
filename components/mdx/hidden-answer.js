import {jsx} from '@emotion/react'
import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'

const HiddenAnswer = ({
  children,
  title = 'Answer',
  byline = 'Don’t reveal until you have finished writing.',
  action = 'Reveal Answer',
  className = 'mb-8',
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
              <div className="font-serif text-2xl font-bold">{title}</div>
              <div className="mb-4">{byline}</div>
              <button
                className="leading-8 text-base font-bold px-5 py-3 rounded-md bg-black hover:bg-gray-900 transition-colors duration-200 ease-in-out text-white"
                onClick={() => setShown(!isShown)}
              >
                {action}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          css={{
            'img, pre, .gif_player': {
              display: isShown ? 'inherit' : 'none',
            },
          }}
          className={!isShown ? `max-h-96 overflow-hidden w-full` : `w-full`}
        >
          <div style={{opacity: isShown ? 1 : 0.2}}>
            <div className="text-2xl font-bold font-serif">Answer</div>
            {children}
          </div>
          <motion.div
            initial={{backdropFilter: 'blur(12px)'}}
            animate={{
              backdropFilter: isShown ? 'blur(0px)' : 'blur(12px)',
            }}
            className="w-full h-full absolute top-0 left-0 pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}

export default HiddenAnswer
