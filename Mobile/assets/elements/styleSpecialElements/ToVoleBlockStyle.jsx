import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const ToVoleBlockStyle = StyleSheet.create({
  //Стиль блока с текстовыми полями
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: ColorProperties.inputBlockBorderColor,
    },
    selectedOption: {
        backgroundColor: ColorProperties.inputBlockBackgroundColor, // Цвет заднего фона для выбранного элемента
    },
    optionText: {
        marginLeft: 8,
    },

    //Стиль для каждой кнопки
    buttonElement: {
        borderWidth: 1,
        borderColor: ColorProperties.buttonColor,
        borderStyle: "solid",
        borderRadius: 2,
        width: "100%",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ColorProperties.buttonColor,
        height: 40,
        marginTop: 15
    },

    //Стиль текста в кнопках
    buttonText: {
        color: ColorProperties.buttonTextColor,
    },
});