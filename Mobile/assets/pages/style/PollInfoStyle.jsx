import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { ColorProperties } from "../../Data/ColorProperties";

const backGroundColor = "#5C6BC0";
const buttonTextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const PollInfoStyle = StyleSheet.create({
      indicator: {
        backgroundColor: '#fff', // Цвет индикатора активной вкладки
      },

      label: {
        fontWeight: 'bold',
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0.5,
      },

      Headder: {
        flex: 1,
        height: 30,
      },  

      ShortPollCard: {
        width: "100%",
      },

      TextBox: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: "center",
        flexDirection: "row"
      },
    
      Text: {
        color: ColorProperties.textColorInShortPollCard,
        paddingBottom: 3,
        fontWeight: "800",
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 10,
        paddingRight: 30,
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0.5,
        margin: "auto"
      },

      TabBar: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '100%',
        elevation: 0,
      },

      ImageBox: {
        paddingLeft: 10
      },
    
      Image: {
        width: 30,
        height: 30,
      },
});