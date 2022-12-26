import React, { useState } from 'react'
import { Text, SafeAreaView, Button } from 'react-native'
import CustomTextInput from '../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { addList } from '../../services/ListService';
import useListContentService from '../../services/ListContentService';
import { TextInput } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import CustomButton from '../atoms/CustomButton';

const ListContentAddUpdateForm = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const { addListContent } = useListContentService()
  const {
    handleSubmit,
    control
  } = useForm();

  const submit = async (data) => {
    console.log(await addListContent(route.params.listId,data.name))
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <CustomTextInput
        label={"List Content Name"}
        name="name"
        rules= {{ required: "Required Field", maxLength: {value:20, message:"Max 20"}}}
        control={control}
      />
      <CustomButton title="Add List Content" onPress={handleSubmit(submit)} />
    </SafeAreaView>
  )
}

export default ListContentAddUpdateForm