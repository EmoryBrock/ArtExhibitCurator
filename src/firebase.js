// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"


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
const auth = getAuth();
const storage = getStorage();

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

// //To load current user info
// export function useAuth() {
//     const [currentUser, setCurrentUser] = useState();
  
//     useEffect(() => {
//       const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
//       return unsub;
//     }, [])
  
//     return currentUser;
//   }

  // To store user avatar
  export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');
  
    setLoading(true);
    
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
  
    updateProfile(currentUser, {photoURL});
    
    setLoading(false);
    alert("Uploaded file!");
  }