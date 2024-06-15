import { StyleSheet } from "react-native";

const backGroundColor = "#5C6BC0";
const buttonTextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const PollInfoStyle = StyleSheet.create({
    tabBar: {
        backgroundColor: backGroundColor, // Цвет фона навигации
      },

      indicator: {
        backgroundColor: '#fff', // Цвет индикатора активной вкладки
      },

      label: {
        fontWeight: 'bold',
      },

      ShortPollCard: {
        backgroundColor: "#5C6BC0",
        width: "100%",
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5
      },
    
      Text: {
        color: textColor,
        paddingBottom: 3
      },
});