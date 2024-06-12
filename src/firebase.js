// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiJgXdxnreQrb81KNsMcsx4kQ5WLR3h_s",
  authDomain: "artcurator-6a39c.firebaseapp.com",
  projectId: "artcurator-6a39c",
  storageBucket: "artcurator-6a39c.appspot.com",
  messagingSenderId: "120857779015",
  appId: "1:120857779015:web:28f2c9093d894f4db14a62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)