import { StyleSheet } from "react-native";

const shortPollCardColor = "#304FFE";
const TextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";
const backgroundColor = "#FFFFFF"

export const HeadderStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
  Headder: {
    backgroundColor: backgroundColor,
    marginBottom: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row"
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
    marginTop: "auto"
  },

  Dropdown: {
    position: "absolute",
    left: 270,
    top: 40,
    marginLeft: "10%",
    right: 0,
    zIndex: 2,
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "40%",
  },

});