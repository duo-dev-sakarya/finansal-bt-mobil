import { View, StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Image } from 'react-native';
const ProfileViewBox = ({ displayName, ppURI,email }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors)

  return (
    <View style={styles.mainBox}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: ppURI }}
          style={styles.imageBox}
        />
        <View style={{ flex: 1, padding:6, alignItems:"center" }}>
          <Text style={{fontSize:24}}>{displayName}</Text>
          <Text style={{fontSize:18, marginTop:4}}>{email}</Text>
        </View>
      </View>


    </View>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  mainBox: {
    backgroundColor: colors.card,
    height: 100,
    borderRadius: 12,
    padding: 12
  },
  imageBox: {
    borderRadius: 24,
    width: 72,
    height: 72,
  }
});

export default ProfileViewBox;