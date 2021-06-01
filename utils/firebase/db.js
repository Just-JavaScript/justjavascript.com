import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID + '.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}
const initializeApp = async (firebaseAuthToken) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const firebaseUserCredential = await firebase
    .auth()
    .signInWithCustomToken(firebaseAuthToken)
  const db = firebase.firestore()
  const usersCollectionRef = db.collection('users')
  return {db, usersCollectionRef, firebaseUserCredential}
}

const setAnswerForUser = async ({firebaseAuthToken, answer}) => {
  const {firebaseUserCredential, usersCollectionRef} = await initializeApp(
    firebaseAuthToken
  )
  const contactId = firebaseUserCredential.user.uid
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

const getProgressForUser = async ({firebaseAuthToken}) => {
  const {firebaseUserCredential, usersCollectionRef} = await initializeApp(
    firebaseAuthToken
  )
  const contactId = firebaseUserCredential.user.uid
  const contactRef = usersCollectionRef.doc(contactId)

  return contactRef.get().then((doc) => {
    if (doc.exists) {
      const progress = doc.data().progress
      return progress
    } else {
      return undefined
    }
  })
}

const setUserProgress = async ({firebaseAuthToken, episode, progress}) => {
  const {firebaseUserCredential, usersCollectionRef} = await initializeApp(
    firebaseAuthToken
  )
  const contactId = firebaseUserCredential.user.uid
  const contactRef = usersCollectionRef.doc(contactId)

  return contactRef.get().then((doc) => {
    const updatePayload = {progress: {[episode]: {...progress}}}
    if (doc.exists) {
      return contactRef.set(updatePayload, {merge: true})
    } else {
      return contactRef.set(updatePayload)
    }
  })
}

const resetUserProgress = async ({firebaseAuthToken}) => {
  const {firebaseUserCredential, usersCollectionRef} = await initializeApp(
    firebaseAuthToken
  )
  const contactId = firebaseUserCredential.user.uid
  const contactRef = usersCollectionRef.doc(contactId)

  return contactRef.get().then((doc) => {
    const updatePayload = {progress: {}}
    if (doc.exists) {
      return contactRef.set(updatePayload, {merge: true})
    } else {
      return contactRef.set(updatePayload)
    }
  })
}

export default {
  setAnswerForUser,
  getProgressForUser,
  setUserProgress,
  resetUserProgress,
}
