import * as React from 'react'
import Layout from 'components/layout'
import {useRouter} from 'next/router'
import {episodes} from 'components/toc'
import {findIndex, find} from 'lodash'
import Link from 'next/link'

const QuizCompleted = () => {
  const {query} = useRouter()
  const currentIdx = findIndex(episodes, {slug: query.quiz})
  const currentEpisode = find(episodes, {slug: query.quiz})
  const nextEpisode = episodes[currentIdx + 1]

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="font-serif text-5xl font-extrabold tracking-tight text-center sm:text-6xl leading-tighter">
          Nice job!
        </h1>
        {currentEpisode && (
          <div className="pt-8 pb-12 font-sans text-xl font-normal tracking-normal">
            You've completed the {currentEpisode.title} quiz.
          </div>
        )}
        {nextEpisode && (
          <Link href={`/${nextEpisode.path}`}>
            <a className="inline-flex items-center px-6 py-4 font-sans text-lg font-semibold text-white transition-all duration-200 ease-in-out transform bg-black rounded-md hover:shadow-xl hover:scale-105 focus:scale-95">
              Continue learning
              {/* {nextEpisode && `to ${nextEpisode.title}`}{' '} */}
              <i className="ml-2 gg-arrow-right" aria-hidden="true" />
            </a>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default QuizCompleted
