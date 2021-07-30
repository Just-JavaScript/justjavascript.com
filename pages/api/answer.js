import isEmpty from 'lodash/isEmpty'
import firebaseApi from 'utils/firebase/db'
import {hny} from "utils/configured-libhoney";
import {firebaseTokenFromHeader} from "utils/firebase/token-from-header";

const quizAnswer = async (req, res) => {
  if (req.method !== 'POST') {
    console.error('non-post request made')
    res.status(404).end()
  }

  const event = hny.newEvent();

  const answer = req.body

  if (isEmpty(answer) || isEmpty(answer?.quiz?.id)) {
    return res.status(400).json({error: 'Malformed Request Body.'})
  }

  event.add({
    name: quizAnswer.name,
    path: req.path,
    ip: req.ip,
    answer
  });

  try {
    const firebaseToken = await firebaseTokenFromHeader(req.headers.cookie, event)

    await firebaseApi.setAnswerForUser({
      firebaseAuthToken: firebaseToken,
      answer,
    })
    return res.status(200).json({status: true})
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    event.add({error: e.message})
    return res.status(500).json({error: 'Unexpected error.'})
  } finally {
    event.send()
  }
}

export default quizAnswer
