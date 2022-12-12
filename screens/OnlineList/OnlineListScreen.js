import { View, StyleSheet } from "react-native";
import Container from "../../components/atoms/Container";
import OnlineLists from "../../components/organisms/OnlineList/OnlineLists";
import { useState, useEffect, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import AddOnlineListGroupForm from "../../components/organisms/OnlineListGroup/AddOnlineListGroupForm";
import DropDownPicker from "react-native-dropdown-picker";
import { getDocs, collection } from "firebase/firestore";
import { FirebaseContext } from "../../contexts/FirebaseContextProvider";
import OnlineListAddUpdate from "../../components/organisms/OnlineList/OnlineListAddUpdate";

const OnlineListScreen = () => {
  const firebaseContext = useContext(FirebaseContext)
  const [selectedValue, setSelectedValue] = useState("java");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  
  const getUserGroups = async () => {
    const res = await getDocs(collection(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'groups'))
    const arr = res.docs.map((d) => ({ value: d.id, label: d.data().name }))
    setItems(arr)
    console.log(arr)
  }

  useEffect(() => {
    getUserGroups()
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
      <OnlineLists groupId={selectedValue} />
      <AddOnlineListGroupForm />
      <OnlineListAddUpdate groupId={selectedValue}/>
    </Container>
  )
}

export default OnlineListScreen