import { View, Text, SafeAreaView } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Container from '../../components/atoms/Container'
import ProfileViewBox from '../../components/molecules/ProfileViewBox'
import { UserContext } from "../../contexts/UserContextProvider"
import { useContext } from 'react'
import FriendRequestForm from '../../components/organisms/User/FriendRequestForm'
const UserScreen = ({ navigation }) => {
  const userContext = useContext(UserContext)
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Container>
        <ProfileViewBox
          displayName={userContext.userData?.displayName}
          ppURI={userContext.userData?.photoURL}
          email={userContext.userData?.email}
        />
        <Text>
          UserScreen
        </Text>
        <FriendRequestForm/>
      </Container>
    </SafeAreaView>
  )
}

export default UserScreen