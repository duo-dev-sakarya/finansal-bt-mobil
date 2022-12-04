import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListAddScreen from './screens/List/ListAddScreen';
import ListsScreen from './screens/List/ListsScreen';
import ListContentScreen from './screens/ListContent/ListContentScreen';
import ListContentAddScreen from './screens/ListContent/ListContentAddScreen';
import AppContextProvider from './contexts/AppContextProvider';
import UserScreen from './screens/User/UserScreen';
import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const OfflineListScreens = () => {
  return (
    <Stack.Navigator initialRouteName="ListsScreen">
      <Stack.Screen name="ListsScreen" component={ListsScreen} />
      <Stack.Screen name="ListAddScreen" component={ListAddScreen} />
      <Stack.Screen name="ListContentScreen" component={ListContentScreen} />
      <Stack.Screen name="ListContentAddScreen" component={ListContentAddScreen} />
    </Stack.Navigator>
  )
}


const UserScreens = () => {
  return (
    <Stack.Navigator initialRouteName="UserScreen">
      <Stack.Screen name="ListsScreen" component={UserScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Private">
          <Tab.Screen name="Private Lists" component={OfflineListScreens}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons name="cloud-offline-outline" size={24} color={focused ? "blue" : "gray"} />
                );
              },
            }} />
          <Tab.Screen name="Public Lists" component={OfflineListScreens}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons name="cloud-outline" size={24} color={focused ? "blue" : "gray"} />
                );
              },
            }} />
          <Tab.Screen name="Login" component={UserScreens}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons name="log-in-outline" size={24} color={focused ? "blue" : "gray"} />
                );
              },
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
