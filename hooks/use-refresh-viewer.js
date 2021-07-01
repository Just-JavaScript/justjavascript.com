import React from 'react'
import {useViewer} from 'context/viewer-context'
import get from 'lodash/get'

export const useRefreshViewer = () => {
  const {authHistory, reloadViewer} = useViewer()
  const lastState = get(authHistory, 'value')
  React.useEffect(() => {
    if (authHistory && authHistory.matches('checkingIfLoggedIn')) {
      reloadViewer()
    }
  }, [lastState])
}
