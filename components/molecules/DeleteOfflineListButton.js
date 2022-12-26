import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import { doc, setDoc, getDocs, collection,deleteDoc  } from 'firebase/firestore';

const DeleteOfflineListButton = ({listId,groupId,refresh}) => {
  const firebaseContext = useContext(FirebaseContext)

  const deleteListRequest = async() => {
    await deleteDoc(doc(firebaseContext.fdb, 'groups', groupId, 'lists',listId))
    refresh()
  }
  return (
    <TouchableOpacity onPress={deleteListRequest}>
      <Ionicons name="close-outline" size={32} color="red" />
    </TouchableOpacity>
  )
}

export default DeleteListButton