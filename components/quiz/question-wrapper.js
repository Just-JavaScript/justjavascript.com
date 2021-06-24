import React from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'

export default function QuestionWrapper({
  children,
  number,
  className,
  nested,
}) {
  return (
    <div
      className={
        className
          ? className
          : 'md:px-8 px-5 h-full md:py-8 py-8 bg-white rounded-t-lg'
      }
      id={number}
    >
      <AnimateSharedLayout>
        <motion.div layout className="relative">
          {number &&
            (nested ? (
              <div className="mb-3 transform sm:-translate-x-8 sm:absolute sm:mb-0">
                <span className="inline-flex items-center justify-center w-6 h-6 p-2 mr-2 text-xs font-bold lining-nums text-cool-gray-500">
                  {number}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-6 h-6 p-2 mr-2 font-mono text-xs font-bold text-white bg-black rounded-full lining-nums">
                  <span className="sr-only">question</span>
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
