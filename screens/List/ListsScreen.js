import React from 'react'
import { Text,View } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'

const ListsScreen = ({navigation}) => {
  return (
    <View>
      <Text>ListsScreen</Text>
      <FixedAddButton onPress={()=>navigation.navigate("ListAddScreen")}/>
    </View>
  )
}

export default ListsScreen