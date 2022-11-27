import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native"
import { useTheme, useNavigation } from '@react-navigation/native';

const ListViewBox = ({ listId, listContentId, name }) => {
  const navigation = useNavigation()
  const { colors } = useTheme();
  const styles = makeStyles(colors)

  const openListContent = () => {
    if (listId) {
      navigation.navigate("ListContentScreen", {
        listId: listId
      })
    }
  }
  return (
    <TouchableOpacity onPress={openListContent} style={styles.box}>
      <Text>
        {name}
      </Text>
    </TouchableOpacity>
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