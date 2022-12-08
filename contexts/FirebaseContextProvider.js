import { useState, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const FirebaseContext = createContext();

const FirebaseContextProvider = ({ children }) => {
  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
  };

  console.log(firebaseConfig)
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const fdb = getFirestore() 
  
  return (
    <FirebaseContext.Provider value={{app,auth,fdb}}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider