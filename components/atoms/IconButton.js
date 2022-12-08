import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const IconButton = ({ buttonSize = 28, buttonColor = "gray", buttonName = "triangle-outline", ...rest }) => {
  return (
    <TouchableOpacity style={{    
      justifyContent:"center",
      alignItems:"center",
      borderRadius: 12,
      width:buttonSize + 10,
      height:buttonSize + 10
      }} {...rest}>
      <Ionicons name={buttonName} size={buttonSize} color={buttonColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {

  },
});

export default IconButton;