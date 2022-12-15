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
import IconButton from "../../components/atoms/IconButton";
import { useIsFocused } from "@react-navigation/native";
import FixedAddButton from "../../components/atoms/FixedAddButton";

const OnlineListScreen = ({ navigation }) => {
  const firebaseContext = useContext(FirebaseContext)
  const [selectedValue, setSelectedValue] = useState();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const focus = useIsFocused();

  const getUserGroups = async () => {
    const res = await getDocs(collection(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'groups'))
    const arr = res.docs.map((d) => ({ value: d.id, label: d.data().name }))
    setItems(arr)
    console.log(arr)
  }

  useEffect(() => {
    if (focus == true) {
      getUserGroups()
    }
  }, [focus])

  return (
    <Container>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            open={open}
            value={selectedValue}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedValue}
            setItems={setItems}
            placeholder="Select an group"
          />
        </View>
        <View sx={{ flex: 1, alignItems: "flex-end" }}>
          <IconButton buttonName="person-add-outline" buttonColor="gray" onPress={() => navigation.navigate("OnlineListAddGroupScreen")} />
        </View>
      </View>

      <OnlineLists groupId={selectedValue} />

      {selectedValue && <FixedAddButton onPress={() => navigation.navigate("OnlineListAddUpdateScreen", { groupId: selectedValue })} />}

    </Container>
  )
}

export default OnlineListScreen