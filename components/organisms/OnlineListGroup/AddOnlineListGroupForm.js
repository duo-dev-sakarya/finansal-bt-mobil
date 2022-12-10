import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'
import CustomTextInput from '../../../components/atoms/CustomTextInput'
import { useForm } from "react-hook-form";
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../../contexts/FirebaseContextProvider';
import CustomButton from '../../atoms/CustomButton';
import { doc, setDoc, getDocs, collection, writeBatch, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../contexts/UserContextProvider';
import IconButton from '../../atoms/IconButton';
import { useTheme } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker'

const AddOnlineListGroupForm = () => {

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const { colors } = useTheme();
  const firebaseContext = useContext(FirebaseContext)
  const userContext = useContext(UserContext)

  const [showAddUser, setShowAddUser] = useState(false)

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(null);
  const [items, setItems] = useState([]);

  const getFriendsReq = async () => {
    const res = await getDocs(collection(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friends'))
    const arr = res.docs.map((d) => ({ value: d.id, label: d.data().email }))
    setItems(arr)
    console.log(arr)

  }
  useEffect(() => {
    getFriendsReq()
  }, [])

  const submit = async (data) => {
    try {
      console.log(data.groupName, values)



      const batch = writeBatch(firebaseContext.fdb);
      const res = await batch.set(doc(firebaseContext.fdb, 'groups', firebaseContext.auth.currentUser.uid + data.groupName), {
        name: data.groupName,
        users: values
      });
      values.forEach((val)=>{
        console.log(val, firebaseContext.auth.currentUser.uid + data.groupName)
        batch.set(doc(firebaseContext.fdb, 'users', val, "groups", firebaseContext.auth.currentUser.uid + data.groupName), {
          name: data.groupName,
          users: values
        });
      }) 
      batch.set(doc(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, "groups", firebaseContext.auth.currentUser.uid + data.groupName), {
        name: data.groupName,
        users: values
      });
      batch.commit()
      console.log(res)



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
          <SafeAreaView>
            <CustomTextInput
              label={"Add Friends By Mail"}
              {...register("groupName", {
                required: true
              })}
              onChangeText={text => setValue('groupName', text, true)}
              errorMessage={errors.groupName?.message}
            />
            <DropDownPicker
              multiple={true}
              min={0}
              max={5}
              open={open}
              value={values}
              items={items}
              setOpen={setOpen}
              setValue={setValues}
              setItems={setItems}
            />
            <CustomButton title="Send Friend Request" onPress={handleSubmit(submit)} />
          </SafeAreaView>
        </View>
      }
    </>
  )
}

export default AddOnlineListGroupForm