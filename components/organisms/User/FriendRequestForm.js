import React, { useState } from 'react'
import { Text, SafeAreaView, Button } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";

import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';

const FriendRequestForm = () => {

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const firebaseContext = useContext(FirebaseContext)

  const submit = async (data) => {
    try {
      const res = await fetchSignInMethodsForEmail(firebaseContext.auth, data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView>
      <Text>ListContentAddScreen</Text>
      {<CustomTextInput
        label={"Add Friends By Mail"}
        {...register("email", {
          required: true, pattern:
          {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
        onChangeText={text => setValue('email', text, true)}
        errorMessage={errors.email?.message}
      />}
      <CustomButton title="Tx" onPress={handleSubmit(submit)} />
    </SafeAreaView>
  )
}

export default FriendRequestForm