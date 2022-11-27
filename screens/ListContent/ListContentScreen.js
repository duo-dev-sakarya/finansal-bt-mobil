import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'
import ListContentList from '../../components/organisms/ListContentList'
import { useRoute } from '@react-navigation/native'

const ListsScreen = ({ navigation }) => {
  const route = useRoute()
  return (
    <View style={{ flex: 1 }}>
      <ListContentList />
      <FixedAddButton onPress={() => navigation.navigate("ListContentAddScreen",route.params)} />
    </View >
  )
}

export default ListsScreen