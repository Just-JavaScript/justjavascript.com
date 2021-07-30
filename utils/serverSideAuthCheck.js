import get from 'lodash/get'
import {ACCESS_TOKEN_KEY} from 'utils/auth'
import authDisabledForDev from './authDisabledForDev'

export const serverSideAuthCheck = async ({req}) => {
  if (authDisabledForDev) {
    return
  }

  if (process.env.NODE_ENV === 'development') {
    const message = authDisabledForDev
      ? 'Authentication has been disabled, you can access /learn without logging in.'
      : 'Authentication is enabled. You will have to log in as a purchaser to access /learn.'
    console.debug(message)
  }

  const {cookies} = req
  const token = get(cookies, ACCESS_TOKEN_KEY)

  //if there is not a token at all we need to redirect to login
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}
