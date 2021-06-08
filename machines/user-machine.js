import {createMachine, assign} from 'xstate'
import Auth from '../utils/auth'
import {identify} from '../utils/analytics'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import get from 'lodash/get'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import queryString from 'query-string'
import {isBrowser} from '../utils/is-browser'

const auth = new Auth()

// export type AuthenticationMachineContext = {
//   userDetails?: UserDetails;
// };

// interface UserDetails {
//   username: string;
// }

// export type AuthenticationMachineEvent =
//   | {
//       type: 'REPORT_IS_LOGGED_IN';
//       userDetails: UserDetails;
//     }
//   | {
//       type: 'REPORT_IS_LOGGED_OUT';
//     }
//   | {
//       type: 'LOG_OUT';
//     }
//   | {
//       type: 'LOG_IN';
//       userDetails: UserDetails;
//     };

const fetchViewer = async ({
  accessToken,
  viewAsUser,
  refreshViewer = false,
}) => {
  if (!isBrowser()) {
    return
  }

  if (viewAsUser && accessToken) {
    return await auth.becomeUser(viewAsUser, accessToken)
  } else if (window.location.pathname === '/redirect') {
    return await auth.handleAuthentication()
  } else if (accessToken || refreshViewer) {
    return await auth.refreshUser(accessToken)
  }

  return auth.getLocalUser()
}

const getSitePurchases = (viewer) =>
  filter(get(viewer, 'purchased', []), {
    site: process.env.NEXT_PUBLIC_SITE_NAME,
  })

const getCanViewContent = (sitePurchases = []) => {
  return reduce(
    sitePurchases,
    (canViewContent, currentPurchase) => {
      if (canViewContent) {
        return canViewContent
      }

      return get(currentPurchase, 'bulk', false) !== true
    },
    false,
  )
}

const getIsUnclaimedBulkPurchaser = (viewer) => {
  const sitePurchases = getSitePurchases(viewer)
  const canViewContent = getCanViewContent(sitePurchases)
  return !canViewContent && sitePurchases.length > 0
}

export const authenticationMachine = createMachine(
  {
    id: 'authentication',
    initial: 'checkingIfLoggedIn',
    context: {
      viewer: undefined,
      viewAsUser: undefined,
    },
    states: {
      checkingIfLoggedIn: {
        invoke: {
          src: 'checkIfLoggedIn',
          onError: {
            target: 'loggedOut',
          },
        },
        on: {
          REPORT_IS_LOGGED_IN: {
            target: 'loggedIn',
            actions: 'assignViewerToContext',
          },
          REPORT_IS_LOGGED_OUT: 'loggedOut',
        },
      },
      loggedIn: {
        entry: ['identify', 'navigate'],
        on: {
          LOG_OUT: {
            target: 'loggedOut',
          },
          REFRESH_VIEWER: {
            target: 'checkingIfLoggedIn',
          },
        },
      },
      loggedOut: {
        entry: ['clearViewerFromContext', 'clearStorage', 'navigate'],
        invoke: {
          src: 'loggedOutInterval',
        },
        on: {
          LOG_IN: {
            target: 'loggedIn',
            actions: 'assignViewerToContext',
          },
        },
      },
    },
  },
  {
    services: {
      loggedOutInterval: (context, _event) => (send, _onReceive) => {
        const id = auth.monitor(() => {
          const newViewer = auth.getLocalUser()
          if (!isEmpty(newViewer) && !isEqual(newViewer, context.viewer)) {
            send({type: 'LOG_IN', viewer: newViewer})
          }
        })

        return () => clearInterval(id)
      },
      checkIfLoggedIn: (_context, event) => async (send, _onReceive) => {
        try {
          const queryHash = queryString.parse(window.location.hash)
          const accessToken = get(queryHash, 'access_token')
          const querySearch = queryString.parse(window.location.search)
          const viewAsUser = get(querySearch, 'show-as-user')
          const refreshViewer = event.refreshViewer
          const newViewer = await fetchViewer({
            accessToken,
            viewAsUser,
            refreshViewer,
          })

          const resultEvent = isEmpty(newViewer)
            ? {type: 'REPORT_IS_LOGGED_OUT'}
            : pickBy({
                type: 'REPORT_IS_LOGGED_IN',
                viewer: newViewer,
                viewAsUser,
              })

          send(resultEvent)
        } catch (e) {
          console.error({e})
          return null
        }
      },
    },
    actions: {
      identify: (ctx) => {
        identify(ctx.viewer)
      },
      navigate: (context, event) => {
        if (!isBrowser()) {
          return
        }

        switch (event.type) {
          case 'REPORT_IS_LOGGED_IN': {
            if (window.location.pathname !== '/redirect') {
              return
            }
            if (getIsUnclaimedBulkPurchaser(context.viewer)) {
              window.location.replace('/invoice')
            } else if (getCanViewContent(context.viewer)) {
              window.location.replace('/learn')
            }
            return
          }
          case 'LOG_OUT': {
            window.location.replace('/login')
            return
          }
        }
      },
      assignViewerToContext: assign((context, event) => {
        if (event.type !== 'REPORT_IS_LOGGED_IN') {
          return {}
        }
        return {
          viewer: event.viewer,
        }
      }),
      clearViewerFromContext: assign({
        viewer: undefined,
      }),
      clearStorage: () => {
        auth.logout()
      },
    },
  },
)

export default authenticationMachine
