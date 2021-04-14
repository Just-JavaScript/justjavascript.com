import getAccessTokenFromCookie from 'utils/get-token-from-cookie-header'
import fetchEggheadUser from 'utils/fetch-egghead-user'
import firebaseAdminApi from 'utils/firebase/admin'
import quizApi from 'utils/firebase/db'
const handler = async (req, res) => {
  if (req.method !== 'POST') {
    console.error('non-post request made')
    res.status(404).end()
  }

  try {
    const cookieHeader = req.headers.cookie
    const {eggheadToken} = getAccessTokenFromCookie(cookieHeader)
    const eggheadUser = await fetchEggheadUser(eggheadToken)
    const token = await firebaseAdminApi.generateAuthToken(eggheadUser)
    await quizApi.setAnswerForUser({firebaseAuthToken: token})
    return res.status(200).json(token)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return res.status(500).json({error: 'Unexpected error.'})
  }
  return res.status(200).json({status: true})
}

export default handler
