import { View, StyleSheet, Text, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import { useTheme } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import SignOutButton from './SignOutButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import ApproveReqeustButton from './ApproveRequestButton';
import DenyReqeustButton from './DenyRequestButton';

const ProfileViewBox = ({ displayName, ppURI, email, userId, accept, deny, remove,mainUser }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors, mainUser)

  const copyUserId = () => {
    Clipboard.setStringAsync(userId); ToastAndroid.show('Invite Id Copied', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.mainBox}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: ppURI }}
          style={styles.imageBox}
        />
        <View style={{ flex: 1, padding: 6, alignItems: "center" }}>
          <Text style={{ fontSize: 22 }}>{displayName}</Text>
          <Text style={{ fontSize: 14, marginTop: 4 }}>{email}</Text>

        </View>

        <View style={{ justifyContent: "space-around" }}>
          { mainUser && <SignOutButton />}
          { accept && <ApproveReqeustButton userId={userId} displayName={displayName} photoURL={ppURI} email={email} refresh={accept}/> }
          { deny && <DenyReqeustButton userId={userId}  refresh={deny} />}
        </View>

      </View>
      {
        mainUser &&
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ padding: 6, flexDirection: "row", marginTop: 6, width: "100%", borderRadius: 6, backgroundColor: "#E3FFFA" }} onPress={copyUserId}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Invite Id:</Text>
            <Text style={{ flex: 1, textAlign: "center", fontSize: 12, }}>{userId}</Text>
            <Ionicons name="copy-outline" style={{ fontSize: 18 }} color="#00AA95"></Ionicons>
          </TouchableOpacity>
        </View>
      }

    </View>
  )
}

const makeStyles = (colors, mainUser) => StyleSheet.create({
  mainBox: {
    backgroundColor: colors.card,
    height: mainUser ? 136 : 100,
    borderRadius: 12,
    padding: 12
  },
  imageBox: {
    borderRadius: 24,
    width: 72,
    height: 72,
  },
  idBox: {
    padding: 6,
    flexDirection: "row",
    marginTop: 6,
    width: "100%",
    borderRadius: 6,
    backgroundColor: colors.trinetary
  }
});

export default ProfileViewBox;