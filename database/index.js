// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.DB_APIKEY,
  authDomain: process.env.DB_AUTHDOMAIN,
  projectId: process.env.DB_PROJECTID,
  storageBucket: process.env.DB_STORAGEBUCKET,
  messagingSenderId: process.env.DB_MESSAGINGSENDERID,
  appId: process.env.DB_APPID,
  measurementId: process.env.MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();

// FirebaseUI
export const auth = firebase.auth();
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

export const signIn = () => {
  ui.start('#firebaseui-auth-container', uiConfig);
};

export { storage, db };
export default firebase;