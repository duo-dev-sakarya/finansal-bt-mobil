import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, addDoc, collection, writeBatch, getDoc } from 'firebase/firestore';
import IconButton from '../../atoms/IconButton';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'
import { useRoute } from '@react-navigation/native';


const OnlineListContentAddUpdate = ({}) => {

  const {
    handleSubmit,
    control
  } = useForm({});

  const routes = useRoute()
  const { colors } = useTheme();
  const firebaseContext = useContext(FirebaseContext)

  const [showAddUser, setShowAddUser] = useState(false)

  const submit = async (data) => {
    if(groupId!==null){
      const res = await addDoc(collection(firebaseContext.fdb, 'groups', groupId, 'lists',routes.params.listId,"content"), {
        name:data.name
      });
    }
  }

  return (
    <>
      <View sx={{ flex: 1, alignItems: "flex-end" }}>
        <IconButton buttonName="person-add-outline" buttonColor={showAddUser ? "#009688" : "gray"} onPress={() => setShowAddUser(!showAddUser)} />
      </View>
      {showAddUser &&
        <View style={{ backgroundColor: colors.card, borderRadius: 12, marginVertical: 6 }}>
          <SafeAreaView>
            <CustomTextInput
              label={"List Content Name"}
              name="name"
              rules={{ required: "Required Field", maxLength: { value: 20, message: "Max 20" } }}
              control={control}
            />
            <CustomButton title="Add Content" onPress={handleSubmit(submit)} />
          </SafeAreaView>
        </View>
      }
    </>
  )
}

export default OnlineListContentAddUpdate