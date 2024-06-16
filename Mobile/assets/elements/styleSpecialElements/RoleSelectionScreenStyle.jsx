import { StyleSheet } from "react-native";
import {ColorProperties} from "../../Data/ColorProperties"

const backgroundColor = ColorProperties.backgroundColor
const lableColor = ColorProperties.lableColor

export const RoleSelectionScreenStyle = StyleSheet.create({
    RoleSelectionBox: {
        flex: 1,
        backgroundColor: backgroundColor,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    LabelStyle: {
        fontSize: 20,
        color: lableColor,
        paddingBottom: 15,
        fontWeight: "500",
        marginRight: 225
    },

    RoleButton: {
        width: "80%",
        backgroundColor: backgroundColor,
        padding: 10,
        marginTop: 10,
        borderBottomColor: lableColor,
        borderBottomWidth: 1
    },

    RoleNameText: {
        color: lableColor,
    },

    RoleNameTextRootBox: {
        backgroundColor: backgroundColor,
        marginTop: 10,
        padding: 16,
        alignItems: "center",
    },

    RoleNameTextRoot: {
        color: lableColor,
        textAlign: "center"
    }

});