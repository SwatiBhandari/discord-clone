import { initializeApp } from 'firebase/app';
import {getFirestore, query} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBUdAvmGJPUpsW9hn10opsuMhtcCZ05TD4",
    authDomain: "discord-clone-2e73f.firebaseapp.com",
    projectId: "discord-clone-2e73f",
    storageBucket: "discord-clone-2e73f.appspot.com",
    messagingSenderId: "778776103979",
    appId: "1:778776103979:web:90d8de29bd6113ac736e6e",
    measurementId: "G-H19YBH1B55"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db=getFirestore(firebaseApp);
  const auth=getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  export {auth, provider, db, query, firebaseApp};