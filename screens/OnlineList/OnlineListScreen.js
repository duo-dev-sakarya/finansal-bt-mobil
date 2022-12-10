import { View, StyleSheet } from "react-native";
import Container from "../../components/atoms/Container";
import OnlineLists from "../../components/organisms/OnlineList/OnlineLists";
import { useState, useEffect,useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import AddOnlineListGroupForm from "../../components/organisms/OnlineListGroup/AddOnlineListGroupForm";
import DropDownPicker from "react-native-dropdown-picker";
import { getDocs, collection } from "firebase/firestore";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";

const OnlineListScreen = () => {
  const firebaseContext = useContext(FirebaseContext)
  const [selectedValue, setSelectedValue] = useState("java");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const getFriendsReq = async () => {
    const res = await getDocs(collection(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'groups'))
    const arr = res.docs.map((d) => ({ value: d.id, label: d.data().name }))
    setItems(arr)
    console.log(arr)

  }
  useEffect(() => {
    getFriendsReq()
  }, [])
  return (
    <Container>
<DropDownPicker
      open={open}
      value={selectedValue}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedValue}
      setItems={setItems}
/>
      <OnlineLists groupId = {selectedValue}/>
      <AddOnlineListGroupForm/>
    </Container>
  )
}

export default OnlineListScreen