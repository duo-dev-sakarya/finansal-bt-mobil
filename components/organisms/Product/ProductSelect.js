import { VirtualizedList } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, query ,where} from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";
import ListViewbox from "../../molecules/ListViewbox";

import CustomButton from "../../atoms/CustomButton";
import CustomTextInput from "../../atoms/CustomTextInput";
import ProductBox from "../../molecules/ProductBox";

const ProductSelect = ({ groupId }) => {

  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  const [queryText, setQueryText] = useState()

  const findProducts = async () => {
    try {
      const res = await getDocs(query(collection(firebaseContext.fdb, 'products')
        ,where('name', '>=', queryText)
        ,where('name', '<=', queryText + '\uf8ff')))
      const arr = res.docs.map((d) => ({ id: d.id, ...d.data() }))
      setData(arr)
      console.log(arr)
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
  return (<>
    <CustomTextInput
      label={"Search Products"}
      onChangeText={text => setQueryText(text)}
    />
    <CustomButton title="Find product" onPress={findProducts} />

    <VirtualizedList
      data={data}
      initialNumToRender={9}
      renderItem={({ item }) => <ProductBox
        id={item.id}
        name={item.name}
        min={item.min}
        max={item.max}
        avgPrice = {item.avgPrice}
      />
      }
      keyExtractor={item => item.index}
      getItemCount={() => data.length}
      getItem={getItem}
    />
  </>
  )
}

export default ProductSelect