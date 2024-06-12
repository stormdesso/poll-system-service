import { StyleSheet } from "react-native";
import {ColorProperties} from "../../Data/ColorProperties"

const shortPollCardColor = "#304FFE";
const TextColor = "#fff";
const inputBlockBackgroundColor = ColorProperties.inputBlockBackgroundColor;
const inputBlockBorderColor = ColorProperties.inputBlockBorderColor;
const textColor = ColorProperties.textColor
const backgroundColor = ColorProperties.backgroundColor

export const HeadderStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
  Headder: {
    backgroundColor: ColorProperties.backgroundColor,
    marginBottom: 5,
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    zIndex: 1000,
  },

  Search: {
    backgroundColor: inputBlockBackgroundColor,
    width: "70%",
    alignItems: "center",
    margin: "auto",
    borderColor: inputBlockBorderColor,
    borderWidth: 1,
    borderRadius: 2,
  },
 
  SortedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: "auto",
    paddingRight: 20,
    paddingLeft: 15
  },

  Dropdown: {
    position: "absolute",
    left: 270,
    top: 40,
    marginLeft: "10%",
    right: 0,
    zIndex: 1000,
    backgroundColor: backgroundColor,
    borderColor: inputBlockBorderColor,
    borderWidth: 1,
    width: "40%",
  },

  Image: {
    width: 36,
    height: 36
  },

  TextInDropdown: {
    padding: 10,
    color: textColor
  }

});