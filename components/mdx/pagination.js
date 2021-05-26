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
    <div className="">
      {nextPath &&
        (quiz ? (
          <div>
            <div className="pb-10 lg:pb-24 sm:pb-16">{props.children}</div>
            <div className="absolute left-0 flex items-center justify-center w-full px-5 text-center text-white bg-black">
              <Link href={nextPath}>
                <a className="flex flex-col items-center justify-center w-full py-24 group lg:py-48 sm:py-32">
                  <span className="pb-4 text-sm font-bold tracking-wider text-orange-400 no-underline uppercase">
                    {'up next'}
                  </span>
                  <div className="flex items-center font-serif text-3xl font-bold leading-tight lg:text-5xl sm:text-4xl group-hover:underline">
                    {quiz && `Quiz: ${get(quiz, 'title')}`} →
                  </div>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {props.children && (
              <div className="pb-10 lg:pb-24 sm:pb-16">{props.children}</div>
            )}
            <div className="absolute left-0 flex items-center justify-center w-full px-5 text-center text-white bg-black">
              <Link href={nextPath}>
                <a className="flex flex-col items-center justify-center w-full py-24 group lg:py-48 sm:py-32">
                  <span className="pb-4 text-sm font-bold tracking-wider text-orange-400 no-underline uppercase">
                    {'up next'}
                  </span>
                  <div className="flex items-center font-serif text-3xl font-bold leading-tight lg:text-5xl sm:text-4xl group-hover:underline">
                    {(quiz && `Quiz: ${get(quiz, 'title')}`) || props.nextTitle}{' '}
                    →
                  </div>
                </a>
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Pagination
