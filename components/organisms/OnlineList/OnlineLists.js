import { VirtualizedList } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, getDoc } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";
import ListViewbox from "../../molecules/ListViewbox";
import { RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const OnlineLists = ({ groupId,getGroups }) => {

  const focus = useIsFocused()
  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (focus == true) {
    getLists(groupId)
    }
  }, [groupId,focus])

  const getLists = async (groupId) => {
    try {
      setLoading(true)
      const res = await getDocs(collection(firebaseContext.fdb, 'groups', groupId, "lists"))
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
          onRefresh={() => {getLists(groupId),getGroups()}}
          refreshing={loading&&data.length>0}
        />
      }
      renderItem={({ item }) => <ListViewbox
        name={item.name}
        id={item.id}
        groupId={groupId}
        refresh={getLists}
      />
      }
      keyExtractor={item => item.index}
      getItemCount={() => data.length}
      getItem={getItem}
    />
  )
}

export default OnlineLists