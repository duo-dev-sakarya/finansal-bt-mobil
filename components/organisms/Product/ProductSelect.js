import { VirtualizedList } from "react-native"
import { useEffect, useState, useContext } from "react"
import ProfileViewBox from "../../molecules/ProfileViewBox"
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { FirebaseContext } from "../../../contexts/FirebaseContextProvider";
import { useForm } from "react-hook-form";

import CustomButton from "../../atoms/CustomButton";
import CustomTextInput from "../../atoms/CustomTextInput";
import ProductBox from "../../molecules/ProductBox";

const ProductSelect = ({ groupId }) => {

  const firebaseContext = useContext(FirebaseContext)
  const [data, setData] = useState([])
  const [queryText, setQueryText] = useState()

  const {
    handleSubmit,
    control
  } = useForm();

  const findProducts = async (data) => {
    try {
      const res = await getDocs(query(collection(firebaseContext.fdb, 'products')
        , where('name', '>=', data.queryText)
        , where('name', '<=', data.queryText + '\uf8ff')))
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
  return (<>
    <CustomTextInput
      label={"Search Products"}
      name="queryText"
      rules={{
        required: "Required Field",
        maxLength: { value: 20, message: "Max 20", },
        minLength: { value: 3, message: "You need Min 3 character for search" }
      }}
      control={control}
    />
    <CustomButton title="Find product" onPress={handleSubmit(findProducts)} />

    <VirtualizedList
      data={data}
      initialNumToRender={9}
      renderItem={({ item }) => <ProductBox
        id={item.id}
        name={item.name}
        min={item.min}
        max={item.max}
        avgPrice={item.avgPrice}
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