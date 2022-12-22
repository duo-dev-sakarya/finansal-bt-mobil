import { TouchableOpacity } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import { doc, setDoc, getDocs, collection,deleteDoc  } from 'firebase/firestore';

const DeleteListContentButton = ({listId,groupId,contentId,refresh}) => {
  const firebaseContext = useContext(FirebaseContext)

  const deleteListContentRequest = async() => {
    await deleteDoc(doc(firebaseContext.fdb, 'groups', groupId, 'lists',listId,'contents',contentId))
    refresh()
  }
  return (
    <TouchableOpacity onPress={deleteListContentRequest}>
      <Ionicons name="close-outline" size={32} color="red" />
    </TouchableOpacity>
  )
}

export default DeleteListContentButton