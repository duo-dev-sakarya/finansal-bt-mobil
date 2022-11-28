import { createContext, useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite'
import { initializeApp } from "firebase/app";

export const DbContext = createContext();

const DbContextProvider = ({ children }) => {

  const db = SQLite.openDatabase("listie.db")

  const [lastTransaction, setLastTransaction] = useState(new Date())

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDevbXS8T1DhHCveMGDVh5sFpsqvPNxa0Y",
  authDomain: "finansal-bt-1669473932592.firebaseapp.com",
  projectId: "finansal-bt-1669473932592",
  storageBucket: "finansal-bt-1669473932592.appspot.com",
  messagingSenderId: "370176267697",
  appId: "1:370176267697:web:2c1274600bfb0beaf89990",
  measurementId: "G-CL2K65NY21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  useEffect(()=>{
    db.transaction(async tx => {
      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at INT, updated_at INT, is_active INT)'
      )
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS list_contents (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, created_at INT, 
          updated_at INT, 
          is_active INT,
          list_id INTEGER, 
          FOREIGN KEY (list_id) REFERENCES lists(id)
          )`
      )
    })
  },[])

  return (
    <DbContext.Provider value={{db,lastTransaction,setLastTransaction,app}}>
      {children}
    </DbContext.Provider>
  )
}

export default DbContextProvider