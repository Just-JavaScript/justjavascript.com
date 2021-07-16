import React from 'react'
import { motion } from 'framer-motion'
import Markdown from 'components/quiz/markdown'

export default function Explanation({ children, label, className }) {
  const isMDX = typeof children !== 'string'

  const explanationRef = React.useRef()
  React.useEffect(() => {
    explanationRef?.current?.focus({
      preventScroll: true,
    })
  }, [])

  return (
    <div
      className={`bg-white md:mt-3 mt-3 relative z-0 md:p-8 p-5 flex sm:flex-row flex-col sm:space-x-3 md:rounded-lg border border-cool-gray-100 overflow-y-auto ${
        className ? className : ''
      }`}
    >
      <span
        className="inline-block -mt-1 -ml-2 text-2xl font-bold"
        role="img"
        aria-label="bulb"
        aria-hidden="true"
      >
        {label ? label : '💡'}
      </span>
      <div
        className="prose prose-sans sm:prose-sans-lg max-w-none"
        tabIndex={-1}
        aria-label="answer submitted. explanation"
        ref={explanationRef}
      >
        {isMDX ? children : <Markdown>{children}</Markdown>}
      </div>
    </div>
  )
}
