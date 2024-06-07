import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD8pDWFF6l5c2KgExXJItnZXPwQTpRaYsU',
  authDomain: 'gotoluct.firebaseapp.com',
  projectId: 'gotoluct',
  storageBucket: 'gotoluct.appspot.com',
  messagingSenderId: '622354065016',
  appId: '1:622354065016:web:9c3006b5c020287ed16f8d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
