import { StyleSheet } from "react-native";

const buttonColor = "#304FFE";
const buttonTextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const ChatAboutThePollStyle = StyleSheet.create({
  //Стиль для всей страницы
  Container: {
    alignItems: "center",
    height: "97%"
  },

  //Стиль блока с информацией
  MessageBox: {
    width: "90%",
    height: "100%",
    borderColor: inputBlockBorderColor,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 15,
    padding: 15,
    
  },

  SendMessageBlock: {
    marginTop: -50,
    width: "90%",
    height: 50,
    borderColor: inputBlockBorderColor,
    borderWidth: 1,
    borderRadius: 15,
  },

  InfoTextDescription: {
    textAlign: "justify"
  }
});