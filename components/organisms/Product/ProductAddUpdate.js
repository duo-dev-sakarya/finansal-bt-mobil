import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, addDoc, collection, writeBatch, getDoc } from 'firebase/firestore';
import { Firestore } from 'firebase/firestore';
import { UserContext } from '../../../contexts/UserContextProvider';
import IconButton from '../../atoms/IconButton';
import { useTheme } from '@react-navigation/native';

const ProductAddUpdate = ({ }) => {

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


    setDoc(doc(firebaseContext.fdb, 'products', data.productName), {
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

  }

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 12, marginVertical: 6 }}>
      <SafeAreaView>
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
      </SafeAreaView>
    </View>
  )
}

export default ProductAddUpdate