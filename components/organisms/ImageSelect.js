import React, { useEffect } from 'react'
import axios from 'axios'
import Constants from 'expo-constants';
import { Text } from 'react-native';
import { CS_API_KEY, CX } from '@env'

const ImageSelect = () => {
  useEffect(() => {
    search()
  }, [])
  const search = async () => {
    
    let res
    try {
      res = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${CS_API_KEY}&cx=${CX}&q=lectures`)
    } catch (err) {
      console.log(err)
    }

    /*const res = customSearch.cse.list({
      auth:"AIzaSyDevbXS8T1DhHCveMGDVh5sFpsqvPNxa0Y",
      cx:"32a6a5fcc62114222",
      q:"parrot",
      searchType:"image",
      num:2,
    })*/
    console.dir(res, { depth: null })
  }
  return (
    <Text>ImageSelect</Text>
  )
}

export default ImageSelect