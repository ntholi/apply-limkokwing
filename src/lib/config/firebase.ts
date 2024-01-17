import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD1jnjMWlDFoGgit87l-QPARttFiWe8b-M',
  authDomain: 'limko-apply-online.firebaseapp.com',
  projectId: 'limko-apply-online',
  storageBucket: 'limko-apply-online.appspot.com',
  messagingSenderId: '75244047949',
  appId: '1:75244047949:web:0b045f29b2da63fd4c1604',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
