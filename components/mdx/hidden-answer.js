/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'

const HiddenAnswer = ({
  children,
  title = 'Answer',
  byline = 'Don’t reveal until you have finished writing.',
  action = 'Reveal',
  className = 'mb-8',
}) => {
  const [isShown, setShown] = React.useState(false)

  return (
    <div className={className}>
      <div className="relative flex items-start justify-center p-8 rounded-lg bg-gray-50">
        <div className="absolute z-10 transform -translate-y-8 border border-gray-300 border-dashed h-14" />
        {!isShown && (
          <div className="absolute z-10 flex flex-col items-center">
            <div className="pt-8 font-serif text-3xl font-bold sm:text-4xl">
              {title}
            </div>
            <div className="mb-4">{byline}</div>
            <button
              className="px-8 py-2 font-semibold leading-8 text-white transition-all duration-200 ease-in-out bg-black hover:scale-105 hover:shadow-xl focus:scale-90 rounded-full sm:px-10 sm:py-3 hover:bg-gray-900"
              onClick={() => setShown(!isShown)}
            >
              {action}
            </button>
          </div>
        )}
        <div
          css={{
            'img, pre, .gif_player': {
              display: isShown ? 'inherit' : 'none',
            },
          }}
          className="w-full"
        >
          <div style={{ opacity: isShown ? 1 : 0.2 }}>
            <div className="pt-8 font-serif text-3xl font-bold text-center sm:text-4xl">
              Answer
            </div>
            <div
              css={{
                '> :first-of-type': { marginTop: 0 },
                '> :last-of-type': { marginBottom: 0 },
              }}
            >
              {children}
            </div>
          </div>

          <div
            css={{
              backdropFilter: isShown ? 'blur(0px)' : 'blur(12px)',
            }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}

export default HiddenAnswer
