import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDAEP6RerUqS8DHqGef9uQa875RCXap4-o',
  authDomain: 'gotolimkokwing.firebaseapp.com',
  projectId: 'gotolimkokwing',
  storageBucket: 'gotolimkokwing.appspot.com',
  messagingSenderId: '386915381170',
  appId: '1:386915381170:web:32f775f6687bbaaaf97eab',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
