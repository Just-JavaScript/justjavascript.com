import React from 'react'
import Layout from '../components/layout'
import Link from 'next/link'
import useLoginRequired from 'hooks/use-login-required'
import {episodes} from 'components/toc'
import useRedirectUnclaimedBulkToInvoice from 'hooks/use-redirect-to-learn'
import {useViewer} from 'context/viewer-context'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import WelcomeMessage from 'components/welcome-message'
import {useProgress} from 'context/progress-context'
import {motion} from 'framer-motion'

export default function Learn() {
  const {isVerifyingLogin, disableLoginForDev} = useLoginRequired()
  const {progress} = useProgress()

  const {isUnclaimedBulkPurchaser, viewer, loading, viewingAsUserEmail} =
    useViewer()

  useRedirectUnclaimedBulkToInvoice(isUnclaimedBulkPurchaser)

  if (
    !disableLoginForDev() &&
    (isVerifyingLogin || isUnclaimedBulkPurchaser || isEmpty(viewer) || loading)
  ) {
    return null
  }

  const LinkItem = ({
    idx,
    href,
    number,
    children,
    completed,
    quiz,
    quizCompleted,
  }) => {
    return (
      <motion.li
        animate={!progress && {x: [-10, 0], opacity: [0, 1]}}
        transition={{delay: idx / 10}}
        initial={!progress && {opacity: 0}}
        className="relative flex flex-col items-center transition-all duration-200 ease-in-out group"
      >
        <Link href={href}>
          <a
            tabIndex={-1}
            className={
              'rounded-lg h-full group-hover:shadow-xl overflow-hidden sm:px-16 px-8 sm:pt-32 pt-24 sm:pb-40 pb-32 relative flex flex-col items-center justify-center font-extrabold w-full bg-white font-serif transition-all ease-in-out duration-200'
            }
          >
            <div className="relative z-10 font-serif font-extrabold text-gray-200 transition-colors duration-150 ease-in-out text-8xl group-hover:text-gray-400 sm:text-8xl">
              {number}
              {completed && (
                <div
                  // className="absolute right-0 px-10 py-1 -mr-8 font-sans text-sm text-white uppercase transform rotate-45 bg-orange-500 top-3"
                  className={`absolute sm:top-[-0.9rem] sm:right-[-0.9rem] top-[-1rem] right-[-0.8rem] flex items-center justify-center mt-8 text-xs text-gray-600 ${
                    quiz
                      ? quizCompleted
                        ? 'bg-emerald-500'
                        : 'bg-emerald-100'
                      : 'bg-emerald-500'
                  } border-2 border-white rounded-full group-hover:text-white transition-colors duration-150 ease-in-out`}
                >
                  {quiz && !quizCompleted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="14"
                      viewBox="0 0 24 14"
                      className="absolute bottom-0 text-emerald-500"
                    >
                      <path
                        // stroke="white"
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M12,14 C18.627417,14 24,8.627417 24,2 C24,2 19,6 12,2 C5,-2 0,2 0,2 C0,8.627417 5.372583,14 12,14 Z"
                      />
                    </svg>
                  )}
                  {/* Done */}
                  <i
                    aria-hidden="true"
                    className={`gg-check ${
                      quiz
                        ? quizCompleted
                          ? 'text-white'
                          : 'text-transparent'
                        : completed
                        ? 'text-white'
                        : ''
                    }`}
                  ></i>
                  <div className="sr-only">completed</div>
                </div>
              )}
            </div>
            <div className="relative z-10 pb-4 text-3xl leading-none transition-all duration-200 ease-in-out transform sm:text-4xl">
              {children}
            </div>
            {progress && number === '01' && !completed && (
              <motion.div
                animate={{opacity: [0, 1]}}
                initial={{opacity: 0}}
                className="pt-2 font-sans text-sm font-bold tracking-wide text-orange-500 uppercase"
              >
                {'Start Here'}
              </motion.div>
            )}
          </a>
        </Link>
        <div className="absolute flex flex-wrap justify-center mt-2 sm:bottom-10 bottom-6">
          {!isEmpty(quiz) && (
            <Link href={`/quiz/${quiz}`}>
              <a className="flex items-center justify-center px-5 py-3 m-1 text-gray-900 transition-all duration-200 ease-in-out bg-white border border-gray-100 rounded-full hover:bg-black hover:text-white group">
                {/* {quiz && completed && !quizCompleted && (
                  <i
                    className="w-2 h-2 mr-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                )} */}
                {progress && quiz && completed ? (
                  quizCompleted ? null : (
                    <i
                      className="w-1 h-1 mr-2 bg-green-500 rounded-full"
                      aria-hidden="true"
                    />
                  )
                ) : null}
                {'Take a Quiz'}
                <span className="sr-only"> about {children}</span>
              </a>
            </Link>
          )}
          <Link href={href}>
            <a className="flex items-center justify-center px-5 py-3 m-1 text-gray-900 transition-all duration-200 ease-in-out bg-white border border-gray-100 rounded-full shadow-lg hover:bg-black hover:text-white group">
              Read Episode
              <span className="sr-only"> {children}</span>
              <i
                aria-hidden="true"
                className="ml-1 transform scale-75 gg-arrow-right"
              />
            </a>
          </Link>
        </div>
      </motion.li>
    )
  }

  const welcomeMessageProps = isEmpty(viewingAsUserEmail)
    ? {
        text: ' Welcome! Thank you so much for purchasing Just JavaScript.',
        cta: 'View your Invoice',
        path: '/invoice',
      }
    : {
        text: ` You are now viewing as ${viewingAsUserEmail}. Logout to reset.`,
      }

  return (
    <Layout background="bg-gray-100">
      {/* <h1 className="pb-24 font-serif text-5xl font-extrabold tracking-tight text-center lg:text-8xl sm:text-7xl leading-tighter">
        Explore JavaScript Universe
      </h1> */}
      <main className="py-20">
        <WelcomeMessage
          className="max-w-screen-lg p-5 mx-auto mb-5 bg-white rounded-lg"
          {...welcomeMessageProps}
        />
        {episodes && (
          <motion.ul className="grid max-w-screen-lg grid-cols-1 gap-5 mx-auto text-center sm:grid-cols-2">
            {episodes.map((episode, index) => {
              const isCompleted = get(progress, episode.path)?.completed

              return (
                <LinkItem
                  idx={index}
                  key={episode.path}
                  href={episode.path}
                  number={('0' + (index + 1)).slice(-2)}
                  completed={progress && isCompleted}
                  quiz={episode.quiz}
                  quizCompleted={
                    get(progress, `quiz/${episode.path}`)?.completed
                  }
                >
                  {episode.title}
                </LinkItem>
              )
            })}
          </motion.ul>
        )}
      </main>
      <footer className="flex flex-col items-center justify-center w-full max-w-screen-lg py-16 mx-auto space-y-16 sm:py-24 sm:space-y-0 sm:justify-between sm:flex-row">
        <Link href="/invoice">
          <a className="flex items-center px-4 py-2 transition-all duration-200 ease-in-out rounded-lg sm:text-lg hover:bg-white hover:shadow-xl">
            <i className="gg-file" />
            <span className="pl-3">Get your invoice</span>
          </a>
        </Link>
        <Link href="/">
          <a tabIndex={-1} className="font-serif text-2xl font-extrabold">
            JJS
          </a>
        </Link>
      </footer>
    </Layout>
  )
}
