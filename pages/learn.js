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
        className="relative flex flex-col items-center"
      >
        <Link href={href}>
          <a
            className={
              'rounded-lg group h-full hover:shadow-xl overflow-hidden sm:px-16 px-8 sm:py-32 py-24 relative flex flex-col items-center justify-center font-extrabold w-full bg-white font-serif transition-all ease-in-out duration-200'
            }
          >
            <div className="relative z-10 font-serif text-6xl font-extrabold text-gray-200 transition-colors duration-150 ease-in-out sm:text-8xl group-hover:text-orange-500">
              {number}
              {completed && (
                <div
                  // className="absolute right-0 px-10 py-1 -mr-8 font-sans text-sm text-white uppercase transform rotate-45 bg-orange-500 top-3"
                  className={`absolute sm:top-[-1.1rem] sm:right-[-1.3rem] top-[-1.5rem] right-[-1.5rem] flex items-center justify-center p-1 mt-8 text-xs text-gray-600 ${
                    quiz
                      ? quizCompleted
                        ? 'bg-orange-500'
                        : 'bg-gray-200'
                      : 'bg-orange-500'
                  } border-2 border-white rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors duration-150 ease-in-out`}
                >
                  {/* Done */}
                  <i
                    aria-hidden="true"
                    className={`gg-check ${
                      quiz
                        ? quizCompleted && 'text-white'
                        : completed
                        ? 'text-white'
                        : ''
                    }`}
                  ></i>
                  <div className="sr-only">Done</div>
                </div>
              )}
            </div>

            <div className="relative z-10 pb-4 text-2xl leading-none transition-all duration-200 ease-in-out transform sm:text-4xl group-hover:scale-105">
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
        {!isEmpty(quiz) && (
          <Link href={`/quiz/${quiz}`}>
            <a className="absolute flex items-center justify-center px-5 py-3 mt-2 text-gray-900 transition-all duration-200 ease-in-out bg-white rounded-full shadow-lg bottom-10 hover:bg-black hover:text-white group">
              <span className="sr-only">{children}</span>
              {'Quiz'}
              <i aria-hidden="true" className="ml-1 gg-arrow-right" />
              {/* {quizCompleted ? (
              <i aria-hidden="true" className="w-3 ml-1 gg-check" />
            ) : (
              <i aria-hidden="true" className="ml-1 gg-arrow-right" />
            )} */}
            </a>
          </Link>
        )}
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
      <div className="py-20">
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
      </div>
    </Layout>
  )
}
