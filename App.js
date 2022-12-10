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
import { UserContext } from './contexts/UserContextProvider';
import { useContext } from 'react';
import OnlineListScreen from './screens/OnlineList/OnlineListScreen';

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

const OnlineListScreens = () => {
  
  const userContext = useContext(UserContext);

  return (
    <Stack.Navigator initialRouteName="ListsScreen">
      {userContext.userData
        ? <>
          <Stack.Screen name="ListsScreen" component={OnlineListScreen} />
        </>
        : <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />}
    </Stack.Navigator>
  )
}


const UserScreens = () => {

  const userContext = useContext(UserContext);

  return (
    <Stack.Navigator >
      {userContext.userData
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
      <NavigationContainer  theme={MyTheme}>
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
