import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'

export default function QuestionWrapper({children}) {
  return (
    <div className="px-8 h-full border-r border-gray-200 col-span-3 py-16">
      <AnimateSharedLayout>
        <motion.div layout>{children}</motion.div>
      </AnimateSharedLayout>
    </div>
  )
}
