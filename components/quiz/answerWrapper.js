import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'

export default function AnswerWrapper({children, className}) {
  return (
    <motion.div
      // layout
      className={
        className
          ? className
          : 'w-full flex flex-col flex-shrink-0 md:p-8 p-5 md:rounded-lg bg-white border border-cool-gray-100'
      }
    >
      {children}
    </motion.div>
  )
}
