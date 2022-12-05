import Login from '../../components/organisms/Login'
import { View, Text } from 'react-native'

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center",justifyContent: 'center' }}>
      <Text style={{ marginBottom: 16, marginHorizontal:32, fontSize:16}}>You need to login with google account for access online features</Text>
      <Login/>
    </View>
  )
}

export default LoginScreen