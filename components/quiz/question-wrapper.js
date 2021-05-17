import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'

export default function QuestionWrapper({children, number, className, nested}) {
  return (
    <div
      className={className ? className : 'md:px-8 px-5 h-full md:py-8 py-8'}
      id={number}
    >
      <AnimateSharedLayout>
        <motion.div layout className="relative">
          {number &&
            (nested ? (
              <div className="transform sm:-translate-x-8 sm:absolute sm:mb-0 mb-3">
                <span className="mr-2 p-2  w-6 h-6 text-xs lining-nums font-bold inline-flex justify-center items-center text-cool-gray-500">
                  {number}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="mr-2 p-2 rounded-full w-6 h-6 text-xs lining-nums font-bold inline-flex justify-center items-center bg-black text-white font-mono">
                  {number}
                </span>
              </div>
            ))}
          {children}
        </motion.div>
      </AnimateSharedLayout>
    </div>
  )
}
