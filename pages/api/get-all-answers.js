import { getTokenFromCookieHeaders } from 'utils/auth'
import fetchEggheadUser from 'utils/fetch-egghead-user'
import firebaseAdminApi from 'utils/firebase/admin'
import firebaseApi from 'utils/firebase/db'

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    console.error('non-get request made')
    res.status(404).end()
  }

  try {
    const cookieHeader = req.headers.cookie
    const { eggheadToken } = getTokenFromCookieHeaders(cookieHeader)

    if (!eggheadToken) {
      throw new Error('eggheadToken is empty')
    }

    const eggheadUser = await fetchEggheadUser(eggheadToken)
    if (!eggheadUser) {
      throw new Error('eggheadUser is empty')
    }
    const firebaseToken = await firebaseAdminApi.generateAuthToken(eggheadUser)
    if (!firebaseToken) {
      throw new Error('token is empty')
    }

    const answers = await firebaseApi.getAllAnswers({
      firebaseAuthToken: firebaseToken,
    })
    res.status(200).json(answers)
    return answers
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
}

export default handler
