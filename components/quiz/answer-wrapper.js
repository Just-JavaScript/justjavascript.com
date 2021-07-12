import React from 'react'

export default function AnswerWrapper({ children, className }) {
  return (
    <div
      className={
        className
          ? className
          : 'w-full flex flex-col md:p-8 p-5 md:rounded-b-lg border-t border-gray-100 bg-white '
      }
    >
      {children}
    </div>
  )
}
