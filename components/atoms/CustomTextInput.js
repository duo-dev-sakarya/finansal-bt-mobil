import { TextInput, StyleSheet } from "react-native"
import { forwardRef } from "react";

const CustomTextInput = forwardRef(({...rest},ref) => {
  return (
    <TextInput ref={ref} style={styles.input} placeholder="Type Here " {...rest}/>
  )
})

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
});

export default CustomTextInput