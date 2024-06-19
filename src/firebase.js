// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


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
export const auth = getAuth();

// const storage = getStorage();
export const db = getFirestore(app)

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logOut = () => {
  return signOut(auth);
}

  // To store user avatar
  // export async function upload(file, currentUser, setLoading) {
  //   const fileRef = ref(storage, currentUser.uid + '.png');
  
  //   setLoading(true);
    
  //   const snapshot = await uploadBytes(fileRef, file);
  //   const photoURL = await getDownloadURL(fileRef);
  
  //   updateProfile(currentUser, {photoURL});
    
  //   setLoading(false);
  //   alert("Uploaded file!");
  // }