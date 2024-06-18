// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr4AsPvAFXllswC5mRdn7rRhjxjidI8rw",
  authDomain: "artiquestv2.firebaseapp.com",
  projectId: "artiquestv2",
  storageBucket: "artiquestv2.appspot.com",
  messagingSenderId: "514899402905",
  appId: "1:514899402905:web:79f2bbbde76c726d545808",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
