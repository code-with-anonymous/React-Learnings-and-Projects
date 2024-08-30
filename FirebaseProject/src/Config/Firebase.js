// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh9XfFYywt-qfFODSHiPmAp8c2akVKmsE",
  authDomain: "react-firebaase.firebaseapp.com",
  projectId: "react-firebaase",
  storageBucket: "react-firebaase.appspot.com",
  messagingSenderId: "176083411163",
  appId: "1:176083411163:web:6dd117642cd042d2c82cfe",
  measurementId: "G-46TW1MQLZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);

const storage = getStorage(app);

export { analytics, auth,fireStore ,storage}