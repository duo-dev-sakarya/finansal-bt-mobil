import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import DeleteListContentButton from './DeleteListContentButton';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateDoc,doc } from 'firebase/firestore';
import { FirebaseContext } from '../../contexts/FirebaseContextProvider';

const ListContentViewBox = ({ name, id, listId, groupId, refresh, min, max, avgPrice, checked }) => {
  const { colors } = useTheme();
  const navigation = useNavigation()
  const [localChecked, setLocalChecked] = useState(checked)
  const firebaseContext = useContext(FirebaseContext)
  const [conditionalColors, setConditionalColors] = useState(checked ?
    {
      viewColor: colors.card,
      checkIconColor :"green",
      deleteIconColor :"red",
      textColor:"black"
    } : {
      viewColor:  "lightgray",
      checkIconColor :"gray",
      deleteIconColor :"red",
      textColor:"gray"
    })
  const openListContent = () => {
    if (id) {
      navigation.navigate("OnlineListContentScreen", {
        groupId: groupId,
        listId: id
      })
    }
  }

  const checkUncheckListContent = async () => {
    const checkReqVal = localChecked?false:true
    await updateDoc(doc(firebaseContext.fdb, 'groups', groupId, 'lists',listId,'contents',id),{
      checked:checkReqVal
    })
    setLocalChecked(checkReqVal)
  }

  return (
    <View style={{
      borderRadius: 12,
      padding: 12,
      backgroundColor:  colors.card ,
      flexDirection: "row",
      marginVertical: 3,
      opacity:localChecked ? 0.5:1
    }}>
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 22 }}>{name}</Text>
      </View>
      <View style={{ justifyContent: "space-around" }}>
        <TouchableOpacity onPress={checkUncheckListContent}>
          <Ionicons name={localChecked ? "return-up-forward-outline" : "checkmark-outline"} size={32} color="green" />

        </TouchableOpacity>
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={{ fontSize: 22, }}>{avgPrice} $</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Text style={{ fontSize: 10 }}></Text>
          <Text style={{ fontSize: 8 }}>{min.vendor} </Text>
          <Text style={{ fontSize: 10 }}>{min.price} $</Text>

          <Text style={{ fontSize: 10 }}>/</Text>
          <Text style={{ fontSize: 8 }}>{max.vendor} </Text>
          <Text style={{ fontSize: 10 }}>{max.price} $</Text>

        </View>
        <View style={{ flexDirection: "row", }}>
        </View>
      </View>
      <View style={{ justifyContent: "space-around" }}>
        <DeleteListContentButton listId={listId} contentId={id} groupId={groupId} refresh={refresh} />
      </View>
    </View>
  )
}

export default ListContentViewBox