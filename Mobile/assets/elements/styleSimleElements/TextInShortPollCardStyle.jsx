import { StyleSheet } from "react-native";

const shortPollCardColor = "#304FFE";
const TextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const TextInShortPollCardStyle = StyleSheet.create({
  IconAndTextBox: {
    flexDirection: "row",
    alignItems: "center"
  },

  Text: {
    color: "white",
    paddingBottom: 3,
    paddingLeft: 3,
    fontWeight: "500",
    textShadowColor: 'gray',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.1,
    
  },

  Image: {
    width: 16,
    height: 16,
  },
});
