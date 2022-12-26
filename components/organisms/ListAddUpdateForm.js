import React, { useState } from 'react'
import { Text, SafeAreaView, Button } from 'react-native'
import CustomTextInput from '../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { addList } from '../../services/ListService';
import useListService from '../../services/ListService';
import CustomButton from '../atoms/CustomButton';

const ListAddUpdateForm = ({ navigation }) => {

  const { addList } = useListService()
  const {
    handleSubmit,
    control,
  } = useForm();

  const submit = async (data) => {
    console.log(await addList(data.name))
    navigation.navigate("ListsScreen")
  }

  return (
    <SafeAreaView sx={{      flex: 1,
      alignItems: "center",
      margin: 10}}>
      <CustomTextInput
        label={"List Name"}
        name="name"
        rules= {{ required: "Required Field", maxLength: {value:20, message:"Max 20"}}}
        control={control}
      />
      <CustomButton title="Add List" onPress={handleSubmit(submit)} />
    </SafeAreaView>
  )
}

export default ListAddUpdateForm