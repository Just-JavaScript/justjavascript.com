import React from 'react'
import Link from 'next/link'

const Pagination = (props) => {
  return (
    <div className="flex sm:flex-row flex-col-reverse  items-center border-t border-gray-200 mt-16 py-8 w-full">
      {props.prev && (
        <Link href={props.prev}>
          <a className="sm:mt-28 mt-20 sm:absolute lg:-ml-20">
            {/* prettier-ignore */}
            <svg className="mr-2 text-gray-400 " width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M7 16l-4-4m0 0l4-4m-4 4h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
          </a>
        </Link>
      )}
      {props.next && (
        <div className="mt-16 flex flex-col items-center justify-center w-full">
          <span className="uppercase text-sm mb-4 text-gray-500 tracking-wider no-underline">
            {'up next'}
          </span>
          <Link href={props.next}>
            <a className="flex items-center sm:text-3xl text-2xl font-bold font-serif leading-tight hover:underline">
              {props.children}
              {/* prettier-ignore */}
              <svg className="ml-2" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Pagination
