import { StyleSheet } from "react-native";

const buttonColor = "#304FFE";
const buttonTextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const PollPageStyle = StyleSheet.create({
  //Стиль для всей страницы
  container: {
    width: "100%",
    flex: 1,
    zIndex: 1
  },
  
  pollList: {
    flex: 1,
    width: "100%",
  },
});
