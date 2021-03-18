import React, {FunctionComponent} from 'react'
import Auth from '../utils/auth'
import queryString from 'query-string'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'

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
  const [viewer, setViewer] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const previousViewer = React.useRef(viewer)

  React.useEffect(() => {
    setViewer(auth.getLocalUser())
  }, [])

  React.useEffect(() => {
    previousViewer.current = viewer
  })

  React.useEffect(() => {
    const queryHash = queryString.parse(window.location.hash)
    const accessToken = get(queryHash, 'access_token')
    const noAccessTokenFound = isEmpty(accessToken)
    const viewerIsPresent = !isEmpty(viewer)
    const querySearch = queryString.parse(window.location.search)
    const viewAsUser = get(querySearch, 'show-as-user')

    let viewerMonitorIntervalId

    const loadViewerFromStorage = async () => {
      const newViewer = await auth.refreshUser(accessToken)
      if (!isEqual(newViewer, viewer)) {
        setViewer(newViewer)
      }
      setLoading(() => false)
    }

    const clearAccessToken = () => {
      if (!isEmpty(accessToken)) {
        window.history.replaceState({}, document.title, '.')
      }
    }

    const setViewerOnInterval = () => {
      const newViewer = auth.getLocalUser()
      if (!isEmpty(newViewer) && !isEqual(newViewer, previousViewer.current)) {
        setViewer(newViewer)
      }
    }

    const clearUserMonitorInterval = () => {
      const intervalPresentForClearing = !isEmpty(viewerMonitorIntervalId)
      if (intervalPresentForClearing) {
        window.clearInterval(viewerMonitorIntervalId)
      }
    }
    const loadBecomeViewer = () => {
      auth.becomeUser(viewAsUser, accessToken).then((viewer) => {
        setViewer(viewer)
        setLoading(() => false)
      })
    }

    if (viewAsUser && accessToken) {
      loadBecomeViewer()
    } else if (viewerIsPresent) {
      loadViewerFromStorage()
      clearAccessToken()
    } else if (noAccessTokenFound) {
      viewerMonitorIntervalId = auth.monitor(setViewerOnInterval)
      setLoading(() => false)
    } else {
      auth.handleAuthentication().then((viewer) => {
        setViewer(viewer)
        setLoading(() => false)
      })
    }

    return clearUserMonitorInterval
  }, [viewer])

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

  const isUnclaimedBulkPurchaser = !canViewContent
  const values = React.useMemo(
    () => ({
      viewer,
      sitePurchases,
      logout: () => {
        auth.logout()
        window.location.reload()
      },
      setSession: (session) => auth.setSession(session),
      isAuthenticated: () => auth.isAuthenticated(),
      authToken: auth.getAuthToken,
      requestSignInEmail: (email) => auth.requestSignInEmail(email),
      isUnclaimedBulkPurchaser,
      loading,
    }),
    [viewer, loading],
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
