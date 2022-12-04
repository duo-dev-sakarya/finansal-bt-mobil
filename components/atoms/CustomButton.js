import { TouchableOpacity, StyleSheet, Text } from "react-native";

const CustomButton = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default CustomButton;