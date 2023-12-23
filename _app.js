import '@/styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase"
import Login from './Login';
import Loading from '@/components/Loading';
import { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // Changed to serverTimestamp

export default function App({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const document = doc(db, `users/${user.uid}`);
      setDoc(
        document,
        {
          email: user.email,
          lastseen: serverTimestamp(), // Corrected field name and used serverTimestamp()
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);


   if (loading) return <Loading />;
   if (!user) return <Login />;

  return <Component {...pageProps} />
}
