import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const api = {}

if (!firebase.apps.length) {
  console.debug('running firebase initialization')
  firebase.initializeApp(config)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  const db = firebase.firestore()
  const usersCollectionRef = db.collection('users')
  const setAnswerForUser = ({contactId, answer}) => {
    console.debug('setting quiz answer')
    const contactRef = usersCollectionRef.doc(contactId)
    return contactRef.get().then((doc) => {
      const updatePayload = {[answer.quiz.question.id]: answer}
      if (doc.exists) {
        return contactRef.update(updatePayload)
      } else {
        return contactRef.set(updatePayload)
      }
    })
  }
  api.setAnswerForUser = setAnswerForUser
} else {
  api.setAnswerForUser = () => console.error('firebase is not set up correctly')
}

export default api
