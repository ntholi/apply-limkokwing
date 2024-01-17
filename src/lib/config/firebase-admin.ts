import { cert, getApp, getApps, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

function createFirebaseAdminApp() {
  if (getApps().length === 0) {
    return admin.initializeApp({
      credential: cert(serviceAccount as admin.ServiceAccount),
    });
  } else {
    return getApp();
  }
}

const app = createFirebaseAdminApp();
const adminAuth = getAuth(app);

export { adminAuth };
