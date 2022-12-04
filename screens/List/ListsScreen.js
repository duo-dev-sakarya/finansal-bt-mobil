import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'
import ListsList from '../../components/organisms/ListsList'
import ImageSelect from '../../components/organisms/ImageSelect'
import Container from '../../components/atoms/Container'

const ListsScreen = ({ navigation }) => {
  return (
    <Container>
      <View style={{ flex: 1 }}>

        <ListsList />
        <FixedAddButton onPress={() => navigation.navigate("ListAddScreen")} />

      </View >
    </Container>
  )
}

export default ListsScreen