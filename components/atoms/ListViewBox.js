import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native"
import { useTheme, useNavigation } from '@react-navigation/native';
import useListService from "../../services/ListService";
import Ionicons from '@expo/vector-icons/Ionicons';

const ListViewBox = ({ listId, listContentId, name }) => {
  const navigation = useNavigation()
  const { colors } = useTheme();
  const styles = makeStyles(colors)
  const { deleteList } = useListService()

  const openListContent = () => {
    if (listId) {
      navigation.navigate("ListContentScreen", {
        listId: listId,
        listName: name
      })
    }
  }

  const deleteListFunc = async () => {
    await deleteList(listId)
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
        <TouchableOpacity onPress={openListContent} sx={{ flex: 2 }}>
          <Text style={{ fontSize: 22 }}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
      </View>
      <View style={{ justifyContent: "space-around" }}>
        <TouchableOpacity onPress={deleteListFunc}>
          <Ionicons name="close-outline" size={32} color="red" />
        </TouchableOpacity>
      </View>
    </View>

  )
}

const makeStyles = (colors) => StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    height: 60,
    justifyContent: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    padding: 10,
  },
  text: {

  }
});


export default ListViewBox