import { View, Text, StyleSheet } from "react-native"
import { useTheme } from '@react-navigation/native';

const ListViewBox = ({ name }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors)
  return (
    <View style={styles.box}>
      <Text>
        {name}
      </Text>
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