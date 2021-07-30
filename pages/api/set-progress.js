import firebaseApi from 'utils/firebase/db'
import {firebaseTokenFromHeader} from "utils/firebase/token-from-header";
import {hny} from "utils/configured-libhoney";


const setCourseProgress = async (req, res) => {
  if (req.method !== 'POST') {
    console.error('non-post request made')
    res.status(404).end()
  }

  const event = hny.newEvent();

  const {episode, progress} = req.body

  event.add({
    name: setCourseProgress.name,
    ip: req.ip,
    path: req.path,
    episode,
    progress
  });

  try {
    const firebaseToken = await firebaseTokenFromHeader(req.headers.cookie, event)

    await firebaseApi.setUserProgress({
      firebaseAuthToken: firebaseToken,
      episode,
      progress,
    })

    res.status(200).json({status: true})
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    event.add({error: e.message})
    return res.status(500).json({error: 'Unexpected error.'})
  } finally {
    event.send()
  }
}

export default setCourseProgress
