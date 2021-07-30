import { purchaseVerifier } from 'utils/egghead-purchase-verifier'
import { serverSideAuthCheck } from 'utils/serverSideAuthCheck'
import { ACCESS_TOKEN_KEY } from './auth'
import get from 'lodash/get'

export const checkAuth = async (req) => {
  const possibleAuthRedirect = await serverSideAuthCheck({ req })

  if (possibleAuthRedirect) {
    return possibleAuthRedirect
  }

  const authToken = get(req.cookies, ACCESS_TOKEN_KEY)
  console.log({ authToken })
  const { isUnclaimedBulkPurchaser, canViewContent } = await purchaseVerifier(
    authToken
  )
  // check if they need to claim a seat
  if (isUnclaimedBulkPurchaser) {
    return {
      redirect: {
        destination: '/invoice',
        permanent: false,
      },
    }
  }

  if (!canViewContent) {
    return {
      redirect: {
        destination: '/buy',
        permanent: false,
      },
    }
  }
}
