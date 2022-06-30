import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup } from "firebase/auth";

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
export const appFireBase = app;
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);

/**
 * Authentication with email and password
 * @param {func} func
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const authUserWithEmailPassword = async (func, email, password) => {
  const auth = getAuth(app);
  let result;
  await func(auth, email, password)
    .then((userCredential) => {
      result = userCredential;
    })
    .catch((error) => {
      result = error;
    });
  return result;
};

export const authUserWithSocial = async (socialProvider) => {
  const auth = getAuth(app);
  auth.languageCode = "ko";
  const provider = new socialProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  let results;

  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = socialProvider.credentialFromResult(result);
      results = {
        credential: credential,
        token: credential.accessToken,
        // The signed-in user info.
        user: result.user,
      };
    })
    .catch((error) => {
      results = {
        // Handle Errors here.
        errorCode: error.code,
        errorMessage: error.message,
        // The email of the user's account used.
        email: error.customData.email,
        // The AuthCredential type that was used.
        credential: socialProvider.credentialFromError(error),
        // ...
      };
    });
  return results;
};
