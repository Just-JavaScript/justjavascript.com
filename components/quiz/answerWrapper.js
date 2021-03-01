import React from 'react'
import {motion} from 'framer-motion'

export default function AnswerWrapper({children, className}) {
  return (
    <motion.div
      className={
        className
          ? className
          : 'w-full flex flex-col md:p-8 p-5 md:rounded-lg bg-white border border-gray-100'
      }
    >
      {children}
    </motion.div>
  )
}
