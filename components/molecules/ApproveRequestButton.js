import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import { doc, setDoc, getDocs, collection,deleteDoc  } from 'firebase/firestore';
import { UserContext } from "../../contexts/UserContextProvider";

const ApproveReqeustButton = ({userId,displayName,photoURL,email,refresh}) => {
  const firebaseContext = useContext(FirebaseContext)
  const userContext = useContext(UserContext)

  const confirmFriendRequest = async() => {
    console.log("here",userId,firebaseContext.auth.currentUser.uid)
    await setDoc(doc(firebaseContext.fdb, 'users', userId, 'friends',firebaseContext.auth.currentUser.uid), {
      displayName:userContext.userData?.displayName,
      photoURL:userContext.userData?.photoURL,
      email:userContext.userData?.email
    });
    console.log("here2")
    await setDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friends',userId), {
      displayName:displayName,
      photoURL:photoURL,
      email:email
    });
    console.log("here3")
    await deleteDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friend_requests',userId))
    console.log("here4")
    await deleteDoc(doc(firebaseContext.fdb, 'users', userId, 'own_requests',firebaseContext.auth.currentUser.uid))
    refresh()
  }
  return (
    <TouchableOpacity onPress={confirmFriendRequest}>
      <Ionicons name="checkmark-outline" size={32} color="green" />
    </TouchableOpacity>
  )
}

export default ApproveReqeustButton