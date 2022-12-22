import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import { doc, setDoc, getDocs, collection,deleteDoc  } from 'firebase/firestore';

const ApproveReqeustButton = ({userId,displayName,photoURL,email,refresh}) => {
  const firebaseContext = useContext(FirebaseContext)

  const confirmFriendRequest = async() => {
    await setDoc(doc(firebaseContext.fdb, 'users', userId, 'friends',firebaseContext.auth.currentUser.uid), {
      displayName:firebaseContext.userData?.displayName,
      photoURL:firebaseContext.userData?.photoURL,
      email:firebaseContext.userData?.email
    });
    await setDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friends',userId), {
      displayName:displayName,
      photoURL:photoURL,
      email:email
    });
    await deleteDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friend_requests',userId))
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