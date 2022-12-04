import { useState, createContext } from "react";

export const FirebaseContext = createContext();

const FirebaseContextProvider = ({ children }) => {
  const [userData,setUserData] = useState()
  const [token,setToken] = useState()
  
  return (
    <FirebaseContext.Provider value={{db,lastTransaction,setLastTransaction,app}}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContextProvider