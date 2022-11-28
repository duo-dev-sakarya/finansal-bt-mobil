import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'
import ListsList from '../../components/organisms/ListsList'
import ImageSelect from '../../components/organisms/ImageSelect'
import Login from '../Login/Login'
const ListsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Login/>
      <ListsList />
      <FixedAddButton onPress={() => navigation.navigate("ListAddScreen")} />
    </View >
  )
}

export default ListsScreen