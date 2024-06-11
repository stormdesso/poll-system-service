import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const InformationAboutThePollStyle = StyleSheet.create({
  //Стиль для всей страницы
  Container: {
    alignItems: "center",
    backgroundColor: ColorProperties.backgroundColor
  },

  //Стиль блока с информацией
  InfoContainer: {
    width: "90%",
    borderColor: ColorProperties.containerColorInPollInfoCard,
    backgroundColor: ColorProperties.containerColorInPollInfoCard,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 15,
    padding: 15,
    elevation: 2,
    shadowColor: ColorProperties.containerShadowInPollInfoCard,
  },

  InfoTextNameBlock: {
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: "500"
  },

  InfoTextDescription: {
    textAlign: "justify",
    paddingLeft: 5,
    lineHeight: 19,
  },

  fileList: {
    marginTop: 30
  }
});