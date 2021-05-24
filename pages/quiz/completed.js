import * as React from 'react'
import Layout from 'components/layout'
import {useRouter} from 'next/router'
import {episodes} from 'components/toc'
import {findIndex, find} from 'lodash'
import Link from 'next/link'

const QuizCompleted = () => {
  const {query} = useRouter()
  const currentIdx = findIndex(episodes, {path: query.quiz})
  const currentEpisode = find(episodes, {path: query.quiz})
  const nextEpisode = episodes[currentIdx + 1]

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-16">
        {currentEpisode && (
          <h1 className="font-serif text-5xl font-extrabold tracking-tight text-center sm:text-6xl leading-tighter">
            <div>Great!</div>
            <div className="pt-4 font-sans text-xl font-normal tracking-normal">
              You've completed "{currentEpisode.title}" quiz.
            </div>
          </h1>
        )}
        {nextEpisode && (
          <Link href={`/${nextEpisode.path}`}>
            <a className="inline-flex items-center px-6 py-4 font-sans text-lg font-semibold text-white bg-black rounded-md">
              Continue {nextEpisode && `to ${nextEpisode.title}`}{' '}
              <i className="ml-2 gg-arrow-right" aria-hidden="true" />
            </a>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default QuizCompleted
