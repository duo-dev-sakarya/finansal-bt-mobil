import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Button, View, KeyboardAvoidingView } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, addDoc, collection, writeBatch, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../contexts/UserContextProvider';
import IconButton from '../../atoms/IconButton';
import { useTheme ,useRoute, useNavigation} from '@react-navigation/native';
import {  } from '@react-navigation/native';

const OnlineListAddUpdate = () => {

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const route = useRoute()
  const navigation = useNavigation()

  const { colors } = useTheme();
  const firebaseContext = useContext(FirebaseContext)

  const submit = async (data) => {
    const groupId = route.params.groupId
    console.log(groupId, data)
    if (groupId !== null) {
      const res = await addDoc(collection(firebaseContext.fdb, 'groups', groupId, 'lists'), {
        name: data.name
      });
      navigation.goBack()
    }

  }

  return (

    <SafeAreaView style={{
      flex: 1,
      justifyContent: "center",
      margin: 10
    }}>
      <KeyboardAvoidingView >
        <CustomTextInput
          label={"List Name"}
          {...register("name", {
            required: true
          })}
          onChangeText={text => setValue('name', text, true)}
          errorMessage={errors.name?.message}
        />
        <CustomButton title="Add List" onPress={handleSubmit(submit)} />
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}

export default OnlineListAddUpdate