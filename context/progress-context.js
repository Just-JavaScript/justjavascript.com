import React from 'react'
import axios from 'axios'
import useSWR, {mutate} from 'swr'
import {useViewer} from 'context/viewer-context'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const defaultProgressContext = {}

export function useProgress() {
  return React.useContext(ProgressContext)
}

export const ProgressContext = React.createContext(defaultProgressContext)

export const ProgressProvider = ({children}) => {
  const [isResetting, setIsResetting] = React.useState(false)
  const {purchased} = useViewer()
  const {data, isValidating, error} = useSWR(
    purchased ? '/api/get-progress' : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  async function setProgress({episode, progress, setCompleted}) {
    setCompleted()
    return await axios
      .post('/api/set-progress', {
        episode,
        progress,
      })
      .then(() => {
        mutate('/api/get-progress')
      })
      .catch(() => {
        setCompleted(!progress.completed)
      })
  }

  async function resetProgress() {
    setIsResetting(true)
    return await axios
      .post('/api/reset-progress')
      .then(() => {
        mutate('/api/get-progress')
      })
      .catch(() => {
        setIsResetting(false)
        console.debug('something went wrong when resetting your progress')
      })
      .finally(() => setIsResetting(false))
  }

  return (
    <ProgressContext.Provider
      value={{
        progress: data,
        setProgress: (props) => (isValidating ? {} : setProgress(props)),
        isResetting,
        resetProgress,
        isValidating,
        error,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
