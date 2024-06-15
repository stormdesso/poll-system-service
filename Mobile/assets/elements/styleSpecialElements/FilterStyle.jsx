import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const FilterStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
      },
    
    SortedButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    Image: {
        width: 25,
        height: 25
    },

    modal: {
        margin: 0,
        width: "100%",
        height: "100%",
        margin: 0,
    },

    FilterContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    
    FilterContainerEntities: {
        alignItems: "center",
        marginTop: 15,
    },

    FilterContainerButton: {
        alignItems: "center",
        marginTop: 70,
        flexDirection: "row",
        gap: 15,
        paddingLeft: "15%",
    },

    Text: {
        color: ColorProperties.lableColor,
        paddingBottom: 15,
        marginLeft: "10%",
        fontSize: 32,
        fontWeight: "500",
    }
})
