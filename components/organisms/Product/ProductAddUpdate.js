import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Button, View, KeyboardAvoidingView,ScrollView } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, addDoc, collection, writeBatch, getDoc } from 'firebase/firestore';
import { useTheme, useRoute, useNavigation } from '@react-navigation/native';

const ProductAddUpdate = ({ }) => {

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

    const min = {
      price: data.price,
      vendor:data.vendorName,
    }

    const max = {
      price: data.price,
      vendor:data.vendorName,
    }

    await setDoc(doc(firebaseContext.fdb, 'products', data.productName), {
      name: data.productName,
      avgPrice: data.price,
      min:{
        price: data.price,
        vendor:data.vendorName,
      },
      max:{
        price: data.price,
        vendor:data.vendorName,
      },
      vendorCount: 1,
      vendors: [{
        name: data.vendorName,
        avgPrice: data.price,
        priceEntry: 1,
        lastUpdate: new Date(),
        createdBy: firebaseContext.auth.currentUser.uid
      }]

    });
    addToList(data.productName,data.price,min,max)
  }

  const addToList= async(name,avgPrice,min,max)=>{
    console.log(route)
    const res = await setDoc(doc(firebaseContext.fdb, 'groups', route.params.groupId, 'lists',route.params.listId,"contents",name), {
      name,
      avgPrice,
      min,
      max
    });
    navigation.navigate("OnlineListContentScreen",
      route.params
    )
  }

  return (
    <KeyboardAvoidingView>
    <ScrollView style={{ backgroundColor: colors.card, borderRadius: 12, marginVertical: 6 }}>

        <CustomTextInput
          label={"Product Name"}
          {...register("productName", {
            required: true
          })}
          onChangeText={text => setValue('productName', text, true)}
          errorMessage={errors.productName?.message}
        />
        <CustomTextInput
          label={"Vendor Name"}
          {...register("vendorName", {
          })}
          onChangeText={text => setValue('vendorName', text, true)}
          errorMessage={errors.vendorName?.message}
        />
        <CustomTextInput
          label={"Price"}
          {...register("price", {
            valueAsNumber: true,
          })}
          onChangeText={text => setValue('price', text, true)}
          errorMessage={errors.price?.message}
        />
        <CustomButton title="Add product" onPress={handleSubmit(submit)} />
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ProductAddUpdate