import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const ChatAboutThePollStyle = StyleSheet.create({
  //Стиль для всей страницы
  Container: {
    height: "97%"
  },

  //Стиль блока с информацией
  MessageBox: {
    height: "100%",
    padding: 15,
  },

  SendMessageBlock: {
    marginTop: -45,
    width: "90%",
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ColorProperties.inputBlockBackgroundColor
  },

  InfoTextDescription: {
    textAlign: "justify"
  },

  dateBlock: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },

  date: {
    color: ColorProperties.textColor,
    fontWeight: "500"
  },

  messageUser: {
    borderColor: ColorProperties.buttonColor,
    borderRadius: 20,
    backgroundColor: ColorProperties.buttonColor,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 10,
    marginBottom: 5,
    width: "60%",
    marginLeft: "auto"
  },

  messageOtherUser: {
    borderColor: ColorProperties.textColor,
    borderRadius: 20,
    backgroundColor: ColorProperties.textColor,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 10,
    marginBottom: 5,
    width: "65%",
  },

  userNameText: {
    color: ColorProperties.otherUserMessageColor,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5
  },

  messageText: {
    color: ColorProperties.otherUserMessageColor,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 5
  },

  Input: {
    paddingLeft: 10,
    width: "89%"
  },

  ImageBox: {
    marginLeft: "auto",
    paddingRight: 10
  },

  Image: {
    width: 40,
    height: 40,
  },
});