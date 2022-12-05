import { TextInput, StyleSheet, View, Text } from "react-native"
import { forwardRef } from "react";
import { useTheme } from "@react-navigation/native";

const CustomTextInput = forwardRef(({label, errorMessage, ...rest }, ref) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors)

  return (
    <View style={styles.view}>
      {label&&<Text style={styles.label}>{label}</Text>}
      <TextInput ref={ref} style={styles.input} placeholder="Type Here " {...rest} />
      {errorMessage&&<Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  )
})

const makeStyles = (colors) => StyleSheet.create({
  input: {
    height:48,
    borderBottomWidth: 2,
    borderColor: "lightgray",
    padding: 10,
    backgroundColor: colors.card,
    borderRadius:12,
  },
  view: {
    marginVertical: 6,
  },
  errorText: {
    fontSize:12,
    color:"red"
  },
  label: {
    marginVertical:6,
    fontWeight: "bold"
  }
});

export default CustomTextInput