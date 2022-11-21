import { TextInput, StyleSheet } from "react-native"

const CustomTextInput = () => {
  return (
    <TextInput style={styles.input} placeholder="Type Here "/>
  )
}

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