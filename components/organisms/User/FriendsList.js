import { VirtualizedList,RefreshControl } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";

const FriendsList = () => {

  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    getFriendsReq()
  }, [])

  const getFriendsReq = async () => {
    setLoading(true)
    const res = await getDocs(collection(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friends'))
    const arr = res.docs.map((d) => ({ id: d.id, ...d.data() }))
    setLoading(false)
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
      refreshControl={
        <RefreshControl
          onRefresh={getFriendsReq}
          refreshing={loading&&data.length>0}
        />
      }
      renderItem={({ item }) => <ProfileViewBox
        displayName={item.displayName}
        ppURI={item.photoURL}
        email={item.email}
        userId={item.id}
        remove={true}
      />
      }
      keyExtractor={item => item.index}
      getItemCount={() => data.length}
      getItem={getItem}
    />
  )
}

export default FriendsList