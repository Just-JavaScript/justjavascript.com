/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react'
import React from 'react'

const FunFact = ({
  children,
  className = 'sm:my-12 my-8 bg-yellow-50 rounded-lg transform sm:-rotate-1',
}) => {
  return (
    <div className={className}>
      <div className="relative flex items-center justify-center sm:py-8 py-6 sm:px-10 px-5 rounded-lg">
        <div className="w-full">
          <div className="text-xl font-serif font-bold flex sm:pb-4 pb-2">
            Fun Fact
          </div>
          <div
            className="opacity-90"
            css={{
              '> :first-of-type': {marginTop: 0},
              '> :last-of-type': {marginBottom: 0},
              code: {
                backgroundColor: 'yellow',
              },
            }}
          >
            {children}
          </div>
        </div>
        <div
          className="w-3 h-full absolute left-0 top-0 -ml-2"
          style={{
            backgroundImage: `url(/caret.svg)`,
            backgroundSize: '0.75rem auto',
          }}
        />
      </div>
    </div>
  )
}

export default FunFact
