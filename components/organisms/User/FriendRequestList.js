import { VirtualizedList } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";

const FriendRequestList = () => {

  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  useEffect(() => {
    getFriendRequestsReq()
  }, [])

  const getFriendRequestsReq = async () => {
    const res = await getDocs(collection(firebaseContext.fdb, 'users', firebaseContext.auth.currentUser.uid, 'friend_requests'))
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
        accept={getFriendRequestsReq}
        deny={getFriendRequestsReq}
      />
      }
      keyExtractor={item => item.index}
      getItemCount={() => data.length}
      getItem={getItem}
    />
  )
}

export default FriendRequestList