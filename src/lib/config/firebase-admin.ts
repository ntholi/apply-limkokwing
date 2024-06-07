import { cert, getApp, getApps, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

// const credentials: ServiceAccount = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   privateKey: process.env.FIREBASE_PRIVATE_KEY
//     ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
//     : undefined,
// };

function adminApp() {
  // if (getApps().length === 0) {
  //   return admin.initializeApp({
  //     credential: cert(credentials),
  //   });
  // } else {
  return getApp();
  // }
}

export const adminAuth = getAuth(adminApp());
