import React from 'react'
import Link from 'next/link'
import {episodes} from 'components/toc'
import {get, isEmpty, find} from 'lodash'
import {useRouter} from 'next/router'

const Pagination = (props) => {
  const router = useRouter()
  const currentSlug = router.query.slug
  const quiz = find(episodes, {quiz: currentSlug})
  const quizSlug = get(quiz, 'quiz')
  const nextPath = isEmpty(quiz) ? props.next : `/quiz/${quizSlug}`

  return nextPath ? (
    <div className="max-w-screen-lg pb-16 mx-auto sm:pb-24">
      <div className="flex flex-col items-center">
        {/* {props.children && (
              <div className="pb-10 lg:pb-24 sm:pb-16">{props.children}</div>
            )} */}
        <div
          className={`flex items-center justify-center w-px h-24 border ${
            props.completed ? 'border-emerald-500' : 'border-transparent'
          } border-dashed transition-colors ease-in-out duration-200`}
        />

        <div
          className={`relative flex items-center justify-center w-full px-5 text-center transition-all duration-200 ease-in-out bg-white border ${
            props.completed ? 'border-gray-200' : 'border-gray-100'
          } rounded-lg hover:shadow-xl`}
        >
          <Link href={nextPath}>
            <a className="flex flex-col items-center justify-center w-full py-16 group lg:py-32 sm:py-24">
              <span
                className={`pb-4 text-sm font-bold tracking-wider ${
                  props.completed ? 'text-emerald-500' : 'text-orange-500'
                } no-underline uppercase transition-colors ease-in-out duration-200`}
              >
                {'up next'}
              </span>
              <div className="flex items-center font-serif text-3xl font-bold leading-tight lg:text-5xl sm:text-4xl ">
                {/* {(quiz && `Quiz: ${get(quiz, 'title')}`) || props.nextTitle} → */}
                {(quiz && `Take a Quiz`) || props.nextTitle} →
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  ) : null
}

export default Pagination
