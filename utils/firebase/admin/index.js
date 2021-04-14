import {FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL} from './config'
import * as firebaseAdmin from 'firebase-admin'

const generateAuthToken = async (eggheadUser) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: FIREBASE_ADMIN_PROJECT_ID,
      }),
      databaseURL: `https://${FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
    })
  }
  const token = await firebaseAdmin
    .auth()
    .createCustomToken(eggheadUser.contact_id)
    .catch((error) => {
      console.log('Error creating custom token:', error)
    })
  return token
}

export default {generateAuthToken}
