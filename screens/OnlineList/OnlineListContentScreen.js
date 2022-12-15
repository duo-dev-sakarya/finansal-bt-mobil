import React from 'react'
import Container from '../../components/atoms/Container'
import { Text } from 'react-native'
import OnlineListContents from '../../components/organisms/OnlineListContent.js/OnlineListContents'
import ProductAddUpdate from '../../components/organisms/Product/ProductAddUpdate'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductSelect from '../../components/organisms/Product/ProductSelect'
import CustomButton from '../../components/atoms/CustomButton'
import { useRoute } from '@react-navigation/native'
import FixedAddButton from '../../components/atoms/FixedAddButton'

const TopTab = createMaterialTopTabNavigator();


const OnlineListContentScreen = ({navigation}) => {
  const route = useRoute()
  return (
    <Container>
      <OnlineListContents/>
      <FixedAddButton onPress={()=>navigation.navigate("OnlineListContentAddScreen",route.params)} />
    </Container>
  )
}

export default OnlineListContentScreen