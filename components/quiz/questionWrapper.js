import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'

export default function QuestionWrapper({children, number}) {
  return (
    <div className="md:px-8 px-5 h-full md:py-8 py-8" id={number}>
      <AnimateSharedLayout>
        <motion.div layout>
          <div className="mb-4">
            <span className="mr-2 p-2 rounded-full w-6 h-6 text-xs lining-nums font-bold inline-flex justify-center items-center bg-indigo-100 text-indigo-800">
              {number}
            </span>
          </div>
          {children}
        </motion.div>
      </AnimateSharedLayout>
    </div>
  )
}
