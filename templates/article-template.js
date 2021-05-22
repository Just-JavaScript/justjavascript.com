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

const Article = ({
  children,
  title,
  series,
  episode,
  next,
  prev,
  nextTitle,
  ...props
}) => {
  const router = useRouter()
  const EPISODE_ID = router.pathname.substring(1)
  const {progress, setProgress} = useProgress()
  const isVerifyingLogin = useLoginRequired()
  const {isUnclaimedBulkPurchaser, loading} = useViewer()
  const currentEpisodeProgress = progress && progress[EPISODE_ID]
  const [completed, setCompleted] = React.useState(
    currentEpisodeProgress?.completed
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
    <Layout navContent={<ToC />} title={title} episode={episode} {...props}>
      <div className="prose prose-lg lg:prose-xl max-w-none">{children}</div>

      <button
        className="inline-flex px-4 py-3 mt-8 text-white bg-black rounded-md"
        type="button"
        onClick={() => handleSetProgress()}
      >
        {progress ? (
          completed ? (
            'Completed'
          ) : (
            'Mark as complete'
          )
        ) : (
          <Spinner className="text-white" />
        )}
      </button>
      <Pagination next={next} prev={prev}>
        {nextTitle}
      </Pagination>
    </Layout>
  )
}

export default Article
