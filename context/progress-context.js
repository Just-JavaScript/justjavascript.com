import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import {useViewer} from 'context/viewer-context'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const defaultProgressContext = {}

export function useProgress() {
  return React.useContext(ProgressContext)
}

export const ProgressContext = React.createContext(defaultProgressContext)

export const ProgressProvider = ({children}) => {
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
      .catch(() => {
        setCompleted(!progress.completed)
      })
  }

  return (
    <ProgressContext.Provider
      value={{
        progress: data,
        setProgress: (props) => (isValidating ? {} : setProgress(props)),
        isValidating,
        error,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
