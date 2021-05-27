import React from 'react'
import ToC from '../components/toc'
import Layout from '../components/layout'
import Pagination from '../components/mdx/pagination'
import useLoginRequired from 'hooks/use-login-required'
import {useViewer} from 'context/viewer-context'
import {useProgress} from 'context/progress-context'
import {useRouter} from 'next/router'
import Spinner from 'components/spinner'
import isUndefined from 'lodash/isUndefined'
import {InView} from 'react-intersection-observer'
import {motion} from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const Article = ({
  children,
  title,
  series,
  episode,
  next,
  prev,
  nextTitle,
  bottomContent,
  ...props
}) => {
  const router = useRouter()
  const EPISODE_ID = router.pathname.substring(1)
  const {progress, setProgress} = useProgress()
  const isVerifyingLogin = useLoginRequired()
  const {isUnclaimedBulkPurchaser, loading} = useViewer()
  const currentEpisodeProgress = progress && progress[EPISODE_ID]
  const [completed, setCompleted] = React.useState(
    currentEpisodeProgress?.completed || false
  )

  function handleSetProgress() {
    setProgress({
      episode: EPISODE_ID,
      progress: {
        completed: !completed,
        date: Date.now(),
      },
      setCompleted: (initialProgress) => {
        // handle error state in case user is offline or api request fails
        isUndefined(initialProgress)
          ? setCompleted(!completed)
          : setCompleted(initialProgress)
      },
    })
  }

  React.useEffect(() => {
    currentEpisodeProgress && setCompleted(currentEpisodeProgress.completed)
  }, [currentEpisodeProgress])

  if (isVerifyingLogin || isUnclaimedBulkPurchaser || loading) {
    return null
  }

  return (
    <Layout
      navChildren={<ToC />}
      background="bg-white"
      title={title}
      {...props}
    >
      <article>
        {title && (
          <header className="relative flex items-center justify-center py-48 min-h-[65vh] text-center">
            <h1 className="relative z-10 mb-8 overflow-hidden font-serif text-5xl font-extrabold lg:text-9xl md:text-6xl sm:text-5xl leading-tighter">
              {title}
            </h1>
            {episode && (
              <span className="absolute z-0 sm:text-8xl text-6xl transform md:scale-[5] scale-[3.5] text-gray-100 font-extrabold font-serif">
                {('0' + episode).slice(-2)}
              </span>
            )}
          </header>
        )}
        <main className="max-w-screen-lg mx-auto prose prose-lg lg:prose-xl">
          {children}
        </main>
        <footer>
          <div className="flex flex-col items-center justify-center pt-24 text-center lg:pt-40 sm:pt-32">
            <h5>
              <div className="text-3xl font-bold sm:text-4xl">
                Finished reading?
              </div>
              <div className="pt-2 pb-8 sm:text-lg opacity-80">
                Mark this episode as learned to track your progress.
              </div>
            </h5>
            <InView key={module.slug} delay={200}>
              {({inView, ref}) => {
                return (
                  <motion.div
                    ref={ref}
                    animate={
                      !completed && {rotateZ: inView ? [0, -5, 5, 0] : 0}
                    }
                  >
                    <button
                      type="button"
                      className={`inline-flex  items-center justify-center px-5 py-3 text-white text-lg  ${
                        progress
                          ? completed
                            ? ' bg-emerald-500'
                            : 'bg-black'
                          : 'bg-black'
                      } rounded-md`}
                      onClick={() => handleSetProgress()}
                      role="switch"
                      aria-checked={completed}
                    >
                      {!isUndefined(progress) ? (
                        <>
                          <div
                            className={`${
                              completed ? 'bg-emerald-400' : 'bg-gray-500'
                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2`}
                          >
                            <span
                              aria-hidden="true"
                              className={`${
                                completed ? 'translate-x-5' : 'translate-x-0'
                              } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                            />
                          </div>
                          {completed ? (
                            <>
                              {/* <i className="gg-check" aria-hidden="true" /> */}
                              {'Great job!'}
                              <span className="sr-only">
                                Mark as unfinished
                              </span>
                            </>
                          ) : (
                            <>{'Mark as learned'}</>
                          )}
                        </>
                      ) : (
                        <>
                          <Spinner className="text-white" />
                          <span className="sr-only">loading</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )
              }}
            </InView>
          </div>
          <Pagination
            next={next}
            prev={prev}
            nextTitle={nextTitle}
            completed={completed}
          >
            <div>
              {nextTitle}
              {/* {bottomContent ? (
                <ReactMarkdown className="max-w-screen-lg mx-auto prose prose-lg lg:prose-xl">
                  {bottomContent}
                </ReactMarkdown>
              ) : (
                nextTitle
              )} */}
            </div>
          </Pagination>
        </footer>
      </article>
    </Layout>
  )
}

export default Article
