import { VirtualizedList } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, getDoc } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";
import ListViewbox from "../../molecules/ListViewbox";

const OnlineLists = ({ groupId }) => {

  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  useEffect(() => {
    getLists(groupId)
  }, [groupId])

  const getLists = async (groupId) => {
    try {
      console.log(groupId, firebaseContext.auth.currentUser.uid)
      const res = await getDocs(collection(firebaseContext.fdb, 'groups', groupId, "lists"))
      const arr = res.docs.map((d) => ({ id: d.id, ...d.data() }))
      setData(arr)
    }
    catch (err) {
      console.log(err)
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