import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const MyAccountStyle = StyleSheet.create({
    Headder: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10
    },
    
    MyAccountBox: {
        alignItems: "center"
    },

    InfoBox: {
        width: "90%",
        borderColor: ColorProperties.containerColorInPollInfoCard,
        backgroundColor: ColorProperties.containerColorInPollInfoCard,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 10,
        padding: 15,
        elevation: 2,
        shadowColor: ColorProperties.containerShadowInPollInfoCard,
        alignItems: "center",
    },

    InfoBoxAddAddress: {
        width: "90%",
        borderColor: ColorProperties.containerColorInPollInfoCard,
        backgroundColor: ColorProperties.containerColorInPollInfoCard,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 10,
        padding: 15,
        elevation: 2,
        shadowColor: ColorProperties.containerShadowInPollInfoCard,
        alignItems: "center",
        flexDirection: "row",
        gap: 50,
        zIndex: 1
    },

    Text: {
        color: ColorProperties.lableColor,
        marginLeft: "1%",
        fontSize: 32,
        fontWeight: "500",
    },

    NameBoxText: {
        color: ColorProperties.lableColor,
        marginRight: "50%",
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 10
    },

    NameBoxText2: {
        color: ColorProperties.lableColor,
        marginRight: "61%",
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 10
    },

    address: {
        marginBottom: 10,
        flexDirection: "row",
        gap: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: ColorProperties.backgroundColor,
        paddingLeft: 10,
    },

    AddressText: {
        width: "100%",
        marginBottom: 10,
        fontSize: 15,
        fontWeight: "400"
    },

    SortedButton: {
        marginLeft: -40
    },

    Image: {
        width: 25,
        height: 25
    },

    ImageAdd: {
        width: 45,
        height: 45
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
        marginTop: 10,
        gap: 10
    },

    itemContainer: {
        marginBottom: 10,
    }
})