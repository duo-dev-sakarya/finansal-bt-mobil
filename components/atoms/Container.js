import { View, StyleSheet } from "react-native"

const Container = ({ children }) => {
  return (
    <View style={styles}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  margin:10,
  flex:1,
});

export default Container