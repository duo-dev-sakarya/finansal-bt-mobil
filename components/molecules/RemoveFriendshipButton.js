import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import { doc, setDoc, getDocs, collection,deleteDoc  } from 'firebase/firestore';

const RemoveFriendshipButton = ({userId,refresh}) => {
  const firebaseContext = useContext(FirebaseContext)

  const removeFriendshipRequest = async() => {
    console.log(userId,firebaseContext.auth.currentUser.uid)
    await deleteDoc(doc(firebaseContext.fdb, 'users', userId, 'friends',firebaseContext.auth.currentUser.uid))
    await deleteDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friends',userId))
    refresh()
  }
  return (
    <TouchableOpacity onPress={removeFriendshipRequest}>
      <Ionicons name="close-outline" size={32} color="red" />
    </TouchableOpacity>
  )
}

export default RemoveFriendshipButton