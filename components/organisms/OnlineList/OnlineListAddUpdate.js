import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, addDoc, collection, writeBatch, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../contexts/UserContextProvider';
import IconButton from '../../atoms/IconButton';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'

const OnlineListAddUpdate = ({groupId}) => {

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const { colors } = useTheme();
  const firebaseContext = useContext(FirebaseContext)

  const [showAddUser, setShowAddUser] = useState(false)

  const submit = async (data) => {
    console.log(groupId,data)
    if(groupId!==null){
      const res = await addDoc(collection(firebaseContext.fdb, 'groups', groupId, 'lists'), {
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
              label={"Add Friends By Mail"}
              {...register("name", {
                required: true
              })}
              onChangeText={text => setValue('name', text, true)}
              errorMessage={errors.name?.message}
            />
            <CustomButton title="Send Friend Request" onPress={handleSubmit(submit)} />
          </SafeAreaView>
        </View>
      }
    </>
  )
}

export default OnlineListAddUpdate