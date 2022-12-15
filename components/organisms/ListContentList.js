import { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import FixedAddButton from '../../components/atoms/FixedAddButton'
import ListViewBox from '../../components/atoms/ListViewBox'
import useListContentService from '../../services/ListContentService'
import { VirtualizedList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import OfflineListContentViewBox from '../molecules/OfflineListContentBox'

const ListContentList = ({}) => {

  const { fetchListContent, lastTransaction } = useListContentService(loadLists)
  const [data, setData] = useState([])
  const route = useRoute()

  useEffect(() => {
    loadLists()
  }, [lastTransaction])

  const loadLists = async () => {
    setData(await fetchListContent(route.params.listId))
    console.log(data)
  }

  const getItem = (data, index) => {
    return {
      index,
      ...data[index]
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/*<Text>ListContentScreen</Text>
      <Text>{data.length}</Text>
      <Text>{route.params.listId}</Text>
  <Text>{lastTransaction.toLocaleTimeString()}</Text>*/}
      <VirtualizedList
        data={data}
        initialNumToRender={9}
        renderItem={({ item }) => <OfflineListContentViewBox id={item.id} name={item.name} checked={item.is_checked} />}
        keyExtractor={item => item.index}
        getItemCount={() => data.length}
        getItem={getItem}
      />
    </View >
  )
}

export default ListContentList