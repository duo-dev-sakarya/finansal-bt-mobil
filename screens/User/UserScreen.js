import { View, Text, SafeAreaView } from 'react-native'
import GlobalStyles from '../../GlobalStyles'
import Container from '../../components/atoms/Container'
import ProfileViewBox from '../../components/molecules/ProfileViewBox'
import { UserContext } from "../../contexts/UserContextProvider"
import { useContext } from 'react'
import FriendRequestForm from '../../components/organisms/User/FriendRequestForm'
import { FirebaseContext } from '../../contexts/FirebaseContextProvider'
import FriendRequestList from '../../components/organisms/User/FriendRequestList'
import IconButton from '../../components/atoms/IconButton'
import { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendsList from '../../components/organisms/User/FriendsList'

const TopTab = createMaterialTopTabNavigator();

const UserScreen = ({ navigation }) => {
  const userContext = useContext(UserContext)
  const firebaseContext = useContext(FirebaseContext)

  const [showAddUser, setShowAddUser] = useState(false)

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Container>
        <ProfileViewBox
          displayName={userContext.userData?.displayName}
          ppURI={userContext.userData?.photoURL}
          email={userContext.userData?.email}
          userId={firebaseContext.auth.currentUser.uid}
          mainUser
        />
        <FriendRequestForm initialRouteName="FriendsList" />
        <TopTab.Navigator style={{ borderRadius: 12 }} >
          <TopTab.Screen name="Friends List" component={FriendsList} options={{
            tabBarLabelStyle: {
              textTransform: "none"
            }
          }} />
          <TopTab.Screen name="Friend Requests List" component={FriendRequestList} options={{
            tabBarLabelStyle: {
              textTransform: "none"
            }
          }}/>
        </TopTab.Navigator>
      </Container>
    </SafeAreaView>
  )
}

export default UserScreen