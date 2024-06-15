import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const MyAccountStyle = StyleSheet.create({
    Headder: {
        flexDirection: "row",
        alignItems: "center"
    },
    
    MyAccountBox: {
        alignItems: "center"
    },

    address: {
        marginBottom: 10,
        flexDirection: "row",
        gap: 10,
        width: "23%",
        marginLeft: "7%"
    },

    Text: {
        color: ColorProperties.lableColor,
        marginLeft: "1%",
        fontSize: 32,
        fontWeight: "500",
    },

    SortedButton: {
        justifyContent: 'center',
    },

    Image: {
        width: 25,
        height: 25
    },

    ImageBack: {
        width: 30,
        height: 30
    },

    ImageBox: {
        paddingLeft: 10
    },
    
    ButtonBox: {
        flexDirection: "row",
        marginBottom: 100,
        gap: 10
    }
})