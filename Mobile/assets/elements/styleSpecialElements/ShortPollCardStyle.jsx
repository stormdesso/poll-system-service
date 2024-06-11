import { StyleSheet } from "react-native";
import {ColorProperties} from "../../Data/ColorProperties"

const textColor = ColorProperties.textColorInShortPollCard;

export const ShortPollCardStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
  Container: {
    alignItems: "center"
  },
  
  ShortPollCard: {
    marginBottom: 5,
    width: "97%",
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15
  },

  BlocksInShoerPollCard: {
    flexDirection: "row",
    alignItems: "center"
  },

  IsVotedStatusImage: {
    marginLeft: 110,
    width: 100,
    height: 100
  },

  PollNameInShortCard: {
    color: textColor,
    paddingBottom: 3,
    fontWeight: "800",
    fontSize: 18,
    textShadowColor: 'gray',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.1,
  },

});
