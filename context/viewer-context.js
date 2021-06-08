import React, {FunctionComponent} from 'react'
import Auth from '../utils/auth'
import queryString from 'query-string'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import {useMachine} from '@xstate/react'
import {authenticationMachine} from '../machines/user-machine'

export const auth = new Auth()

const defaultViewerContext = {
  authenticated: false,
  loading: true,
}

export function useViewer() {
  return React.useContext(ViewerContext)
}

export const ViewerContext = React.createContext(defaultViewerContext)

function useAuthedViewer() {
  const [state, send] = useMachine(authenticationMachine)
  const authMachineState = state.value
  const viewer = get(state.context, 'viewer')
  const sitePurchases = filter(get(viewer, 'purchased', []), {
    site: process.env.NEXT_PUBLIC_SITE_NAME,
  })
  const canViewContent = reduce(
    sitePurchases,
    (canViewContent, currentPurchase) => {
      if (canViewContent) {
        return canViewContent
      }

      return get(currentPurchase, 'bulk', false) !== true
    },
    false,
  )
  const isUnclaimedBulkPurchaser = !canViewContent && sitePurchases.length > 0

  const values = React.useMemo(
    () => ({
      viewer,
      sitePurchases,
      logout: () => send('LOG_OUT'),
      authToken: auth.getAuthToken,
      requestSignInEmail: (email) => auth.requestSignInEmail(email),
      isUnclaimedBulkPurchaser,
      purchased: sitePurchases.length > 0,
      reloadViewer: () => {
        if (state.matches('loggedIn')) {
          send({type: 'REFRESH_VIEWER', refreshViewer: true})
        }
      },
      loading: state.matches('checkingIfLoggedIn'),
      authState: authMachineState,
      authHistory: state.history,
    }),
    [viewer, authMachineState],
  )

  return values
}

export const ViewerProvider = ({children}) => {
  const values = useAuthedViewer()

  return (
    <ViewerContext.Provider value={{...values}}>
      {children}
    </ViewerContext.Provider>
  )
}
