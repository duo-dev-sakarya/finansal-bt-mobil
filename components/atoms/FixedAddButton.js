import React from 'react'
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const FixedAddButton = ({ onPress }) => {
  return (
    <View style={styles.input}>
      <TouchableOpacity onPress={onPress} title="FixedAddButton">
        <Ionicons name="add-circle-outline" size={64} color="green" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    bottom: 16,
    right: 16,

  },
});


export default FixedAddButton