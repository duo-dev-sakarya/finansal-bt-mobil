import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
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
import LoginScreen from './screens/User/LoginScreen';
import { FirebaseContext } from './contexts/FirebaseContextProvider';
import { useContext } from 'react';
import OnlineListScreen from './screens/OnlineList/OnlineListScreen';
import OnlineListContentScreen from './screens/OnlineList/OnlineListContentScreen';
import OnlineListContentAddScreen from './screens/OnlineList/OnlineListContentAddScreen';
import OnlineListAddGroupScreen from './screens/OnlineList/OnlineListAddGroupScreen';
import OnlineListAddUpdateScreen from './screens/OnlineList/OnlineListAddUpdateScreen';

const Stack = createStackNavigator();
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

const OnlineListScreens = () => {
  
  const firebaseContext = useContext(FirebaseContext);

  return (
    <Stack.Navigator initialRouteName="ListsScreen">
      {firebaseContext.userData
        ? <>
          <Stack.Screen name="ListsScreen" component={OnlineListScreen} />
          <Stack.Screen name="OnlineListContentScreen" component={OnlineListContentScreen} />
          <Stack.Screen name="OnlineListContentAddScreen" component={OnlineListContentAddScreen} />
          <Stack.Screen name="OnlineListAddGroupScreen" component={OnlineListAddGroupScreen} />
          <Stack.Screen name="OnlineListAddUpdateScreen" component={OnlineListAddUpdateScreen} />
        </>
        : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />}
    </Stack.Navigator>
  )
}


const UserScreens = () => {

  const firebaseContext = useContext(FirebaseContext);

  return (
    <Stack.Navigator >
      {firebaseContext.userData
        ? <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
        : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      }
    </Stack.Navigator>
  )
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#009688",
    secondary: "#00AA95",
    tertiary:"#E3FFFA",
    quaternary:"#FFA17A"
  },
};

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator initialRouteName="Private">
          <Tab.Screen name="Private Lists" component={OfflineListScreens}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons name="cloud-offline-outline" size={24} color={focused ? "#009688" : "gray"} />
                );
              },
            }} />
          <Tab.Screen name="Public Lists" component={OnlineListScreens}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons name="cloud-outline" size={24} color={focused ? "#009688" : "gray"} />
                );
              },
            }} />
          <Tab.Screen name="Account" component={UserScreens}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons name="person-outline" size={24} color={focused ? "#009688" : "gray"} />
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
