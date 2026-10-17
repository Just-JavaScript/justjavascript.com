import React from 'react'
import Link from 'next/link'

const FreeChapterLink = () => {
  return (
    <div className="px-5 pt-32 pb-8 flex flex-col items-center justify-center w-full text-center">
      <div className="pr-1 sm:text-3xl text-2xl font-bold font-serif ">
        Still haven't decided?{' '}
      </div>
      <div className="sm:text-lg leading-tight sm:pt-0 pt-1 px-5">
        <span>Get a glimpse of Just JavaScript by reading a</span>{' '}
        <Link href="/the-javascript-universe">
          <a
            target="_blank"
            className="font-semibold inline-flex items-center underline pt-1 text-orange-500 hover:text-orange-600 transition-all ease-in-out duration-200"
          >
            free chapter{' '}
            <i className="gg-arrow-right scale-[85%] translate-y-px" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default FreeChapterLink
