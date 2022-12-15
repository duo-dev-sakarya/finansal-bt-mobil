import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";


const SignOutButton = () => {
  const firebaseContext = useContext(FirebaseContext)

  const logout = async() => {
    try {
      await signOut(firebaseContext.auth)
      firebaseContext.setUserData()
      firebaseContext.setToken()
    }catch(err) {
      console.log(err)
    }

  }
  return (
    <TouchableOpacity onPress={logout}>
      <Ionicons name="log-out-outline" size={32} color="red" />
    </TouchableOpacity>
  )
}

export default SignOutButton