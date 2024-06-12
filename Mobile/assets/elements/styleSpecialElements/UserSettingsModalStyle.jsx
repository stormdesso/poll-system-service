import { StyleSheet } from "react-native";

export const UserSettingsModalStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: "auto",
        paddingRight: 15,
        paddingLeft: 20
      },
      modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      optionText: {
        fontSize: 18,
        padding: 10,
        color: "black"
      },
      SortedButton: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      Image: {
        width: 36,
        height: 36
      },
});