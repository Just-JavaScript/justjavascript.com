import React from 'react'
import Link from 'next/link'
import {episodes} from 'components/toc'
import {get, isEmpty, find} from 'lodash'
import {useRouter} from 'next/router'

const Pagination = (props) => {
  const {pathname} = useRouter()
  const currentSlug = pathname.slice(1)
  const quiz = find(episodes, {quiz: currentSlug})
  const quizSlug = get(quiz, 'quiz')
  const nextPath = isEmpty(quiz) ? props.next : `/quiz/${quizSlug}`

  return (
    <div className="flex items-center justify-center bg-gray-100 sm:mt-32 mt-16 absolute left-0 w-full">
      {/* {props.prev && (
        <Link href={props.prev}>
          <a className="lg:py-48 sm:py-32 py-24 px-8">
            ←
          </a>
        </Link>
      )} */}
      {nextPath && (
        <Link href={nextPath}>
          <a className="group flex flex-col items-center justify-center w-full lg:py-48 sm:py-32 py-24">
            <span className="uppercase font-bold text-sm pb-4 text-orange-500 tracking-wider no-underline">
              {'up next'}
            </span>
            <div className="flex items-center lg:text-5xl sm:text-4xl text-3xl font-bold font-serif leading-tight group-hover:underline">
              {(quiz && `Quiz: ${get(quiz, 'title')}`) || props.children} →
            </div>
          </a>
        </Link>
      )}
    </div>
  )
}

export default Pagination
