import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import { doc, setDoc, getDocs, collection,deleteDoc  } from 'firebase/firestore';

const DenyReqeustButton = ({userId,refresh}) => {
  const firebaseContext = useContext(FirebaseContext)

  const denyFriendRequest = async() => {
    await deleteDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friend_requests',userId))
    refresh()
  }
  return (
    <TouchableOpacity onPress={denyFriendRequest}>
      <Ionicons name="close-outline" size={32} color="red" />
    </TouchableOpacity>
  )
}

export default DenyReqeustButton