import firebaseApi from 'utils/firebase/db'
import {firebaseTokenFromHeader} from "utils/firebase/token-from-header";
import {hny} from "utils/configured-libhoney";

const getCourseProgress = async (req, res) => {
  if (req.method !== 'GET') {
    console.error('non-get request made')
    res.status(404).end()
  }

  const event = hny.newEvent();

  event.add({
    name: getCourseProgress.name,
    ip: req.ip,
    path: req.path,
  })

  try {
    const firebaseToken = await firebaseTokenFromHeader(req.headers.cookie, event)

    const progress = await firebaseApi.getProgressForUser({
      firebaseAuthToken: firebaseToken,
    })
    res.status(200).json(progress)
    return progress
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    event.add({error: e.message})
    return res.status(500).json({error: 'Unexpected error.'})
  } finally {
    event.send()
  }
}

export default getCourseProgress
