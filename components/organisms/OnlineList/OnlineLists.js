import { VirtualizedList } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";

const OnlineLists = ({groupId}) => {

  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  useEffect(() => {
    getLists()
  }, [])

  const getLists = async () => {
    const res = await getDocs(collection(firebaseContext.fdb, 'groups',groupId))
    const arr = res.docs.map((d) => ({ id: d.id, ...d.data() }))
    setData(arr)
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
      renderItem={({ item }) => <ProfileViewBox
        displayName={item.displayName}
        ppURI={item.photoURL}
        email={item.email}
        userId={item.id}
        remove={getFriendsReq}
      />
      }
      keyExtractor={item => item.index}
      getItemCount={() => data.length}
      getItem={getItem}
    />
  )
}

export default OnlineLists