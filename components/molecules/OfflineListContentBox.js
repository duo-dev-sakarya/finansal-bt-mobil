import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import DeleteListContentButton from './DeleteListContentButton';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateDoc, doc } from 'firebase/firestore';
import { FirebaseContext } from '../../contexts/FirebaseContextProvider';
import useListContentService from '../../services/ListContentService';

const OfflineListContentViewBox = ({ name, id, listId, groupId, refresh, min = {}, max = {}, avgPrice, checked }) => {
  const { colors } = useTheme();
  const navigation = useNavigation()
  const [localChecked, setLocalChecked] = useState(checked === 1 ? true : false)
  const firebaseContext = useContext(FirebaseContext)

  const { checkListContent, deleteListContent } = useListContentService()
  const [conditionalColors, setConditionalColors] = useState(checked ?
    {
      viewColor: colors.card,
      checkIconColor: "green",
      deleteIconColor: "red",
      textColor: "black"
    } : {
      viewColor: "lightgray",
      checkIconColor: "gray",
      deleteIconColor: "red",
      textColor: "gray"
    })

  const checkUncheckListContent = async () => {
    const checkReqVal = localChecked ? 0 : 1
    await checkListContent(id, checkReqVal)
    setLocalChecked(checkReqVal)
  }

  const deleteListContentFunc = async () => {
    await deleteListContent(id)
  }

  return (
    <View style={{
      borderRadius: 12,
      padding: 12,
      backgroundColor: colors.card,
      flexDirection: "row",
      marginVertical: 3,
      opacity: localChecked ? 0.5 : 1
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
      </View>
      <View style={{ justifyContent: "space-around" }}>
        <TouchableOpacity onPress={deleteListContentFunc}>
          <Ionicons name="close-outline" size={32} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OfflineListContentViewBox