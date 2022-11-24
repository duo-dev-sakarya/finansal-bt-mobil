import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ListAddScreen from './screens/List/ListAddScreen';
import ListsScreen from './screens/List/ListsScreen';
import ListContentScreen from './screens/ListContent/ListContentScreen';
import ListContentAddScreen from './screens/ListContent/ListContentAddScreen';
import DbContextProvider from './contexts/DbContextProvider';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DbContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListsScreen">
          <Stack.Screen name="ListsScreen" component={ListsScreen} />
          <Stack.Screen name="ListAddScreen" component={ListAddScreen} />
          <Stack.Screen name="ListContentScreen" component={ListContentScreen} />
          <Stack.Screen name="ListContentAddScreen" component={ListContentAddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DbContextProvider>
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
