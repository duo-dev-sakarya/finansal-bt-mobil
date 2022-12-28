import { TextInput, StyleSheet, View, Text } from "react-native"
import { forwardRef } from "react";
import { useTheme } from "@react-navigation/native";
import { Controller } from "react-hook-form";

const CustomTextInput = ({ label, control, name, rules = {},isNumeric, placeholder }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error  } }) => (
        <>
          <View style={styles.view}>
            {label && <Text style={styles.label}>{label} : </Text>}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              placeholder="Type Here "
              keyboardType={isNumeric&&'numeric'}
              />
              {console.log(error)}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        </>
      )}
    />
  )
}
const makeStyles = (colors) => StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 2,
    borderColor: "lightgray",
    padding: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  view: {
    marginVertical: 6,
  },
  errorText: {
    fontSize: 12,
    color: "red"
  },
  label: {
    margin: 6,
    fontWeight: "bold",
  }
});

export default CustomTextInput