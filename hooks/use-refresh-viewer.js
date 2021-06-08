import React from 'react'
import {useViewer} from 'context/viewer-context'
import last from 'lodash/last'

export const useRefreshViewer = () => {
  const {authState, reloadViewer} = useViewer()
  const [authHistory, setAuthHistory] = React.useState([])

  React.useEffect(() => {
    const TRANSITIONS_BEFORE_LOGGED_IN = 2
    if (last(authHistory) !== authState) {
      setAuthHistory([...authHistory, authState])
    }
    if (
      authState === 'loggedIn' &&
      authHistory.length === TRANSITIONS_BEFORE_LOGGED_IN
    ) {
      reloadViewer()
    }
  }, [authHistory.length, authState])
}
