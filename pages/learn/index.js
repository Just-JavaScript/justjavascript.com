import React from 'react'
import Link from 'next/link'
import Layout from 'components/layout'
import { episodes } from 'components/toc'
import { useProgress } from 'context/progress-context'

export default function Learn() {
  const { progress } = useProgress()
  return (
    <Layout background="bg-gray-100">
      <main className="py-24 max-w-screen-lg mx-auto">
        <h1 className="font-serif text-4xl font-extrabold text-center">Just JavaScript</h1>
        <p className="text-center pt-4 pb-12">
          Every episode and quiz is free. Progress is saved in this browser only.
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {episodes.map((episode, index) => (
            <li key={episode.slug} className="bg-white rounded-lg p-8 text-center">
              <span className="font-serif text-6xl text-gray-300">{('0' + (index + 1)).slice(-2)}</span>
              <h2 className="font-serif text-2xl font-bold py-4">
                <Link href={`/${episode.path}`}><a>{episode.title}</a></Link>
              </h2>
              <div className="flex justify-center space-x-4">
                <Link href={`/${episode.path}`}><a className="underline">Read Episode</a></Link>
                {episode.quiz && (
                  <Link href={`/quiz/${episode.quiz}`}><a className="underline">Take a Quiz</a></Link>
                )}
              </div>
              {progress[episode.slug]?.completed && <p className="pt-4">Episode learned</p>}
            </li>
          ))}
        </ol>
      </main>
    </Layout>
  )
}
