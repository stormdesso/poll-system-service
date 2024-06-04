import { StyleSheet } from "react-native";

const shortPollCardColor = "#304FFE";
const TextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";
const buttonColor = "#5C6BC0";

export const StatisticToVoteBlockStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
    container: {
        flex: 1,
        padding: 16,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    statisticBlock: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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