import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBasgJJQdqBePgdPVdyoZHOnEg0ap47dlM",
  authDomain: "whatsapp-by-jenilpatel139.firebaseapp.com",
  projectId: "whatsapp-by-jenilpatel139",
  storageBucket: "whatsapp-by-jenilpatel139.appspot.com",
  messagingSenderId: "1013095916026",
  appId: "1:1013095916026:web:fe23d4c0135da24ae54443",
  measurementId: "G-PFN2LB1ZH8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };