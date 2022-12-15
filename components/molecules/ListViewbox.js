import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import DeleteListButton from './DeleteListButton';
import { useNavigation } from '@react-navigation/native';

const ListViewbox = ({ name, id,groupId,refresh }) => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  const openListContent = () => {
    if (id) {
      navigation.navigate("OnlineListContentScreen", {
        groupId: groupId,
        listId: id,
        listName:name
      })
    }
  }

  return (
    <View style={{
      borderRadius: 12,
      padding: 12,
      backgroundColor: colors.card,
      flexDirection: "row",
      marginVertical: 3,
    }}>
      <TouchableOpacity style={{ flex: 1, padding: 6 }} onPress={openListContent}>
        <Text style={{ fontSize: 22 }}>{name}</Text>

      </TouchableOpacity>
      <View style={{ justifyContent: "space-around" }}>
        <DeleteListButton listId={id} groupId={groupId} refresh={refresh}/>
      </View>
    </View>
  )
}

export default ListViewbox