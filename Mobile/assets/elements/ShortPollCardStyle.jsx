import { StyleSheet } from "react-native";

const shortPollCardColor = "#304FFE";
const TextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const ShortPollCardStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
  ShortPollCard: {
    backgroundColor: "#5C6BC0",
    marginBottom: 5,
    width: "100%",
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5
  },

  Text: {
    color: TextColor,
    paddingBottom: 3
  }

});
