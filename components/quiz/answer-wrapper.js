import React from 'react'
import {motion} from 'framer-motion'

export default function AnswerWrapper({children, className}) {
  return (
    <motion.div
      className={
        className
          ? className
          : 'w-full flex flex-col md:p-8 p-5 md:rounded-b-lg border-t border-gray-100 bg-white '
      }
    >
      {children}
    </motion.div>
  )
}
