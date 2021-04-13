import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length) {
  console.debug('running firebase initialization')
  firebase.initializeApp(config)
}
const db = firebase.firestore()
const usersCollectionRef = db.collection('users')

const updateDoc = (doc, payload) => {
  if (doc.exists) {
    return contactRef.update(payload)
  } else {
    return contactRef.set(payload)
  }
}

export const setAnswerForUser = ({contactId, answer}) => {
  console.debug('setting quiz answer')
  const contactRef = usersCollectionRef.doc(contactId)
  return contactRef.get().then((doc) => {
    const updatePayload = {[answer.quiz.question.id]: answer}
    return updateDoc(doc, updatePayload)
  })
}
