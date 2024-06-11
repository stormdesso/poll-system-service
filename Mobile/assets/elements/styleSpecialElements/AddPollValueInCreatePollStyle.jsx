import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const AddPollValueInCreatePollStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: "80%",
        margin: "auto",
        marginBottom: 5
      },
      input: {
          width: '97%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: ColorProperties.inputBlockBorderColor,
          marginLeft: '3%'
      },
      errorInput: {
          width: '97%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: ColorProperties.errorBorderColor,
          marginLeft: '3%'
      },
})
