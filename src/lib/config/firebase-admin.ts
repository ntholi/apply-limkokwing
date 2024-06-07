import { cert, getApp, getApps, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';

const credentials: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
};

function adminApp() {
  if (getApps().length === 0) {
    return admin.initializeApp({
      credential: cert(credentials),
    });
  } else {
    return getApp();
  }
}

export const adminAuth = getAuth(adminApp());
