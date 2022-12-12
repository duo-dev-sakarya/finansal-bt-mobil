import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import DeleteListButton from './DeleteListButton';
import { useNavigation } from '@react-navigation/native';

const ListContentViewBox = ({ name, id, groupId, refresh, min, max, avgPrice }) => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  const openListContent = () => {
    if (id) {
      navigation.navigate("OnlineListContentScreen", {
        groupId: groupId,
        listId: id
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


      <View style={{ justifyContent: "space-around" }}>
        <DeleteListButton listId={id} groupId={groupId} refresh={refresh} />
      </View>
    </View>
  )
}

export default ListContentViewBox