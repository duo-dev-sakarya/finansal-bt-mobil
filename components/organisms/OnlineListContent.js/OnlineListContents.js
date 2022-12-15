import { VirtualizedList, RefreshControl } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, getDoc } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";
import { useRoute } from "@react-navigation/native";
import ListContentViewBox from "../../molecules/ListContentBox";
const OnlineListContents = ({ }) => {

  const route = useRoute()
  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getListContents(route.params)
  }, [route.params])

  const getListContents = async ({ listId, groupId }) => {
    try {
      setLoading(true)
      console.log(groupId, listId, firebaseContext.auth.currentUser.uid)
      const res = await getDocs(collection(firebaseContext.fdb, 'groups', groupId, "lists", listId, "contents"))
      const arr = res.docs.map((d) => ({ id: d.id, ...d.data() }))
      setData(arr)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const getItem = (data, index) => {
    return {
      index,
      ...data[index]
    }
  }
  return (
    <VirtualizedList
      data={data}
      initialNumToRender={9}
      refreshControl={
        <RefreshControl
          onRefresh={() => getListContents(route.params)}
          refreshing={loading && data.length > 0}
        />
      }
      renderItem={({ item }) => <ListContentViewBox
        name={item.name}
        listId={route.params.listId}
        id={item.id}
        groupId={route.params.groupId}
        avgPrice={item.avgPrice}
        min={item.min}
        max={item.max}
        refresh={getListContents}
      />
      }
      keyExtractor={item => item.index}
      getItemCount={() => data.length}
      getItem={getItem}
    />
  )
}

export default OnlineListContents