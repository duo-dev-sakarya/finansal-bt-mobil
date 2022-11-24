import React, { useState } from 'react'
import { Text, SafeAreaView, Button } from 'react-native'
import CustomTextInput from '../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { addList } from '../../services/ListService';
import useListService from '../../services/ListService';
import { TextInput } from 'react-native';

const ListAddUpdateForm = ({ navigation }) => {

  const { addList } = useListService()
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    console.log(await addList(data.name))
    navigation.navigate("ListsScreen")
  }

  return (
    <SafeAreaView>
      <Text>ListAddScreen</Text>
      {<CustomTextInput
        label={"Liste Adı"}
        {...register("name", { required: true, maxLength: 30 })}
        onChangeText={text => setValue('name', text, true)}
        errorMessage={errors.title?.message}
      />}
      <Button title="Tx" onPress={handleSubmit(submit)} />
    </SafeAreaView>
  )
}

export default ListAddUpdateForm