import React from 'react'
import Container from '../../components/atoms/Container'
import { Text } from 'react-native'
import OnlineListContents from '../../components/organisms/OnlineListContent.js/OnlineListContents'
import ProductAddUpdate from '../../components/organisms/Product/ProductAddUpdate'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductSelect from '../../components/organisms/Product/ProductSelect'
import { useRoute } from '@react-navigation/native'
const TopTab = createMaterialTopTabNavigator();

const OnlineListContentAddScreen = () => {
  const route=useRoute()
  return (
    <Container>
      <TopTab.Navigator initialRouteName="Product" style={{ borderRadius: 12 }} >
          <TopTab.Screen name="Product"  component={ProductAddUpdate}  initialParams={route.params}options={{
            tabBarLabelStyle: {
              textTransform: "none"
            }
          }} />
          <TopTab.Screen name="Product Select" component={ProductSelect} initialParams={route.params} options={{
            tabBarLabelStyle: {
              textTransform: "none"
            }
          }}/>
        </TopTab.Navigator>
    </Container>
  )
}

export default OnlineListContentAddScreen