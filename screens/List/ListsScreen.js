import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'
import ListsList from '../../components/organisms/ListsList'
import ImageSelect from '../../components/organisms/ImageSelect'
import Container from '../../components/atoms/Container'
import GlobalStyles from '../../GlobalStyles'

const ListsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Container>
        <ListsList />
        <FixedAddButton onPress={() => navigation.navigate("ListAddScreen")} />
      </Container>
    </SafeAreaView >
  )
}

export default ListsScreen