import React from 'react'
import Container from '../../components/atoms/Container'
import { Text } from 'react-native'
import OnlineListContents from '../../components/organisms/OnlineListContent.js/OnlineListContents'
import ProductAddUpdate from '../../components/organisms/Product/ProductAddUpdate'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductSelect from '../../components/organisms/Product/ProductSelect'
import CustomButton from '../../components/atoms/CustomButton'
import { useRoute } from '@react-navigation/native'
import IconButton from '../../components/atoms/IconButton'
const TopTab = createMaterialTopTabNavigator();


const OnlineListContentScreen = ({navigation}) => {
  const route = useRoute()
  return (
    <Container>
      <IconButton buttonName="person-add-outline" buttonColor= "gray" onPress={()=>navigation.navigate("OnlineListContentAddScreen",route.params)} />
      <OnlineListContents/>
    </Container>
  )
}

export default OnlineListContentScreen