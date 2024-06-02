import { StyleSheet } from "react-native";

const buttonColor = "#304FFE";
const buttonTextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const InformationAboutThePollStyle = StyleSheet.create({
  //Стиль для всей страницы
  Container: {
    alignItems: "center"
  },

  //Стиль блока с информацией
  InfoContainer: {
    width: "90%",
    borderColor: inputBlockBorderColor,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 15,
    padding: 15,
    
  },

  InfoTextNameBlock: {
    paddingBottom: 5,
    fontSize: 16
  },

  InfoTextDescription: {
    textAlign: "justify"
  }
});