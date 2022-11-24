import { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'
import ListViewBox from '../../components/atoms/ListViewBox'
import { fetchList } from '../../services/ListService'
import useListService from '../../services/ListService'
import { VirtualizedList } from 'react-native'

const ListsScreen = ({ navigation }) => {

  const {fetchList,lastTransaction} = useListService(loadLists)
  const [data, setData] = useState([])

  useEffect(() => {
    loadLists()
  }, [lastTransaction])

  const loadLists = async() => {
    setData(await fetchList())
  }

  const getItem = (data, index) => {
    return {
       index,
       ...data[index]
    }
 }

  return (
    <View style={{ flex: 1 }}>
      <Text>ListsScreen</Text>
      <Text>{data.length}</Text>
      <Text>{lastTransaction.toLocaleTimeString()}</Text>
      <VirtualizedList
        data={data}
        initialNumToRender={9}
        renderItem={({ item }) => <ListViewBox name={item.name} />}
        keyExtractor={item => item.index}
        getItemCount={() => data.length}
        getItem={getItem}
      />
      <FixedAddButton onPress={() => navigation.navigate("ListAddScreen")} />

    </View >
  )
}

export default ListsScreen