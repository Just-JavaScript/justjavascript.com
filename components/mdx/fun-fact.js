import {jsx} from '@emotion/react'
import React from 'react'

const FunFact = ({children, className}) => {
  return (
    <div className={className}>
      <div className="relative flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="w-full">
          <div className="text-2xl font-serif font-bold">Fun Fact</div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default FunFact
