import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);

// Create user with email and password
export const createUser = async (email, password) => {
  const auth = getAuth(app);
  let result;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result = userCredential;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const signInUser = async (email, password) => {
  const auth = getAuth(app);
  let result;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      result = userCredential;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};
