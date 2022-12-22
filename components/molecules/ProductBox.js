import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useTheme, useRoute,useNavigation } from '@react-navigation/native'
import { useState,useContext } from 'react'
import { setDoc,doc } from 'firebase/firestore'
import { FirebaseContext } from '../../contexts/FirebaseContextProvider'


const ProductBox = ({ name, id, avgPrice, min, max }) => {

  const firebaseContext = useContext(FirebaseContext)
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const [amountMode, setAmountMode] = useState(false)

  const addToList= async()=>{
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
    <TouchableOpacity style={{
      borderRadius: 12,
      padding: 12,
      backgroundColor: colors.card,
      flexDirection: "row",
      marginVertical: 3,
    }} onPress={addToList}>
      
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 22 }}>{name}</Text>
        </View>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 22, }}>{avgPrice} $</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={{ fontSize: 10 }}></Text>
            <Text style={{ fontSize: 8 }}>{min.vendor} </Text>
            <Text style={{ fontSize: 10 }}>{min.price} $</Text>

            <Text style={{ fontSize: 10 }}>/</Text>
            <Text style={{ fontSize: 8 }}>{max.vendor} </Text>
            <Text style={{ fontSize: 10 }}>{max.price} $</Text>

          </View>
          <View style={{ flexDirection: "row", }}>

          </View>

        </View>
     
    </TouchableOpacity>
  )
}

export default ProductBox