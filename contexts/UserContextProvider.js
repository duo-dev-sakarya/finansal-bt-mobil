import { useState,createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData,setUserData] = useState()
  const [token,setToken] = useState()

  return (
    <UserContext.Provider value={{userData,setUserData,token,setToken}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider