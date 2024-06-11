import { StyleSheet } from "react-native";
import {ColorProperties} from "../../Data/ColorProperties"

export const StatisticToVoteBlockStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
    container: {
        flex: 1,
        padding: 16,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statisticBlock: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: ColorProperties.inputBlockBorderColor,
    },

    progressBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    selectedOption: {
        backgroundColor: '#d3d3d3', // Цвет заднего фона для выбранного элемента
    },

    optionText: {
        marginLeft: 8,
        marginBottom: 5
    },

    percentageText: {
        fontSize: 12,
        marginLeft: 5
    },

    progressBar: {
        height: 9,
        width: "85%",
        marginLeft: 8
    },
});