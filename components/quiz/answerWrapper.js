import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'

export default function AnswerWrapper({children}) {
  return (
    <AnimateSharedLayout>
      <aside className="relative col-span-2 px-8 py-16 pb-32">
        <div className="sticky top-8 w-full flex flex-col flex-shrink-0">
          {children}
        </div>
      </aside>
    </AnimateSharedLayout>
  )
}
