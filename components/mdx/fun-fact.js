/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react'

const FunFact = ({
  children,
  className = 'my-8 transform rounded-lg sm:my-12 bg-yellow-50',
}) => {
  return (
    <div className={className}>
      <div className="relative flex items-center justify-center px-5 py-6 rounded-lg sm:py-8 sm:px-10">
        <div className="w-full">
          <div className="flex pb-2 font-serif text-xl font-bold md:text-3xl sm:text-2xl sm:pb-4">
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
          className="absolute top-0 left-0 w-3 h-full -ml-2"
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
