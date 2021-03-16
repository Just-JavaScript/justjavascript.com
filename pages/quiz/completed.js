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
        <h1 className="text-5xl text-center tracking-tight font-serif font-extrabold leading-tighter">
          Awesome, you've completed "{currentEpisode.title}" quiz.
        </h1>
        {nextEpisode && (
          <Link href={`/${nextEpisode.path}`}>
            <a className="inline-flex px-4 py-3 bg-black text-white font-serif text-lg rounded-md font-semibold">
              Continue to {nextEpisode.title}
            </a>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default QuizCompleted
