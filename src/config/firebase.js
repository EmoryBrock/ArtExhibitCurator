// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


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
export const db = getFirestore(app)

// Unique Username check in db
export const checkUsernameExists = async (username) => {
  const usersRef = doc(db, "users", username);
  const docSnap = await getDoc(usersRef);
  return docSnap.exists();
}

export const signUp = async (email, password, username) => {
  try {
    // Check if username is taken
    const isUsernameTaken = await checkUsernameExists(username);
    if (isUsernameTaken) {
      throw new Error("Username already exists, please use a different username.");
    }

    if (username === "undefined") {
      throw new Error("Please enter a username")
    }

    // Proceed with account create
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: username });

    // Store data to user collection
    await setDoc(doc(db, "users", username), {
      email: email,
      username: username,
      password: password,
      avatar: null
    });

    return userCredential;
  } catch (error) {
    throw error
  }
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