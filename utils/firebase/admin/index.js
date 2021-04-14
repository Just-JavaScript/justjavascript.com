import {
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PROJECT_ID,
} from './config'
import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: `https://${FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
  })
}

export {firebaseAdmin}
