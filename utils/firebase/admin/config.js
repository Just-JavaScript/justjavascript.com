import {config} from '../db'
export const FIREBASE_ADMIN_PROJECT_ID = config.projectId
export const FIREBASE_ADMIN_PRIVATE_KEY = process.env.FIREBASE_ADMIN_PRIVATE_KEY
export const FIREBASE_ADMIN_CLIENT_EMAIL =
  process.env.FIREBASE_ADMIN_CLIENT_EMAIL
