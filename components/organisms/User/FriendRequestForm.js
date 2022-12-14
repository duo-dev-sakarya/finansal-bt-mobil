import React, { useState } from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, getDoc, collection, } from 'firebase/firestore';
import IconButton from '../../atoms/IconButton';
import { useTheme } from '@react-navigation/native';

const FriendRequestForm = () => {

  const {
    handleSubmit,
    control
  } = useForm();

  const { colors } = useTheme();
  const firebaseContext = useContext(FirebaseContext)

  const [showAddUser, setShowAddUser] = useState(false)

  const submit = async (data) => {
    try {
      const snapshot = await getDoc(doc(firebaseContext.fdb, 'users', data.userId))
      if (snapshot) {
        const res = await setDoc(doc(firebaseContext.fdb, 'users', data.userId, 'friend_requests', firebaseContext.auth.currentUser.uid), {
          displayName: firebaseContext.userData?.displayName,
          photoURL: firebaseContext.userData?.photoURL,
          email: firebaseContext.userData?.email
        });
        await setDoc(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'own_requests',data.userId ), {
          displayName: firebaseContext.userData?.displayName,
          photoURL: firebaseContext.userData?.photoURL,
          email: firebaseContext.userData?.email
        });
      }


    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <View sx={{ flex: 1, alignItems: "flex-end" }}>
        <IconButton buttonName="person-add-outline" buttonColor={showAddUser ? "#009688" : "gray"} onPress={() => setShowAddUser(!showAddUser)} />
      </View>
      {showAddUser &&
        <View style={{ backgroundColor: colors.card, borderRadius: 12, marginVertical: 6 }}>
          <SafeAreaView><CustomTextInput
            label={"Add Friends By Id"}
            name="userId"
            rules={{ 
              required: "Required Field", 
              maxLength: { value: 28, message: "User id must be 28 charachter" } ,
              minLength: { value: 28, message: "User id must be 28 charachter" } }}
            control={control}
          />
            <CustomButton title="Send Friend Request" onPress={handleSubmit(submit)} />
          </SafeAreaView>
        </View>
      }
    </>
  )
}

export default FriendRequestForm