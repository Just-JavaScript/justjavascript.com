import React from 'react'
import axios from 'axios'
import useSWR, {mutate} from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const defaultProgressContext = {}

export function useProgress() {
  return React.useContext(ProgressContext)
}

export const ProgressContext = React.createContext(defaultProgressContext)

export const ProgressProvider = ({children}) => {
  const {data, isValidating, error} = useSWR('/api/get-progress', fetcher, {
    revalidateOnFocus: false,
  })

  async function setProgress({episode, progress, setCompleted}) {
    setCompleted()
    return Promise.resolve();
    // return await axios
    //   .post('/api/set-progress', {
    //     episode,
    //     progress,
    //   })
    //   .then(() => {
    //     mutate('/api/get-progress')
    //   })
    //   .catch(() => {
    //     setCompleted(!progress.completed)
    //   })
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
