/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react'
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
      <div className="relative flex items-start justify-center p-8 bg-gray-50 rounded-lg">
        <div className="border border-dashed border-gray-300 h-14 transform -translate-y-8 absolute z-10" />
        {!isShown && (
          <div className="absolute z-10 flex flex-col items-center">
            <div className="font-serif text-2xl font-bold pt-8">{title}</div>
            <div className="mb-4">{byline}</div>
            <button
              className="leading-8 font-semibold sm:px-10 sm:py-3 px-8 py-2 rounded-md bg-black hover:bg-gray-900 transition-colors duration-200 ease-in-out text-white"
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
          <div style={{opacity: isShown ? 1 : 0.2}}>
            <div className="text-2xl font-bold font-serif text-center pt-8">
              Answer
            </div>
            <div
              css={{
                '> :first-of-type': {marginTop: 0},
                '> :last-of-type': {marginBottom: 0},
              }}
            >
              {children}
            </div>
          </div>

          <div
            css={{
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
