import React from 'react'
import Link from 'next/link'
import {useLocalStorage} from 'react-use'
import {motion} from 'framer-motion'

export default function WelcomeMessage({
  text,
  className = '',
  cta,
  path,
  storageKey = 'jjs-welcome-banner',
}) {
  const [isOn, setOn] = useLocalStorage(storageKey, true)
  if (!isOn) return null
  return (
    <motion.div className={className}>
      <div className="relative py-3 pl-3 pr-12 mx-auto md:py-4">
        <div className="flex flex-col justify-center md:flex-row md:items-center md:text-center md:space-x-3">
          <div className="text-base sm:text-lg">
            <span role="img" aria-describedby="tada">
              🎉
            </span>
            <span>{text} </span>
            {path && cta && (
              <Link href={path}>
                <a className="underline">{cta}</a>
              </Link>
            )}
          </div>
          <button
            onClick={() => setOn(false)}
            type="button"
            className="absolute right-0 p-2 text-gray-900 transition-all duration-200 ease-in-out bg-white rounded-full shadow-lg hover:text-gray-900 hover:bg-white"
          >
            <span className="sr-only">Dismiss welcome banner</span>
            <svg
              className="w-5 h-5 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
