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
  const [loading, setLoading] = React.useState(false)
  const {data, isValidating, error} = useSWR('/api/get-progress', fetcher, {
    revalidateOnFocus: false,
  })
  function setProgress({episode, progress}) {
    setLoading(true)
    return axios
      .post('/api/set-progress', {
        episode,
        progress,
      })
      .then(() => {
        mutate('/api/get-progress')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <ProgressContext.Provider
      value={{
        progress: data,
        setProgress,
        isValidating: loading || isValidating,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
