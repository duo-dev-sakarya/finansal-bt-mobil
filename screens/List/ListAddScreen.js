import React from 'react'
import ListAddUpdateForm from '../../components/organisms/ListAddUpdateForm'
import { SafeAreaView } from 'react-native'
import Container from '../../components/atoms/Container'
import GlobalStyles from '../../GlobalStyles'

const ListAddScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Container>
        <ListAddUpdateForm navigation={navigation} />
      </Container>
    </SafeAreaView>
  )
}

export default ListAddScreen