import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'

export default function AnswerWrapper({children}) {
  return (
    <AnimateSharedLayout>
      <aside className="relative z-10">
        <motion.div
          // layout
          className="w-full flex flex-col flex-shrink-0 md:p-8 p-5 md:rounded-lg bg-white border border-cool-gray-100"
        >
          {children}
        </motion.div>
      </aside>
    </AnimateSharedLayout>
  )
}
