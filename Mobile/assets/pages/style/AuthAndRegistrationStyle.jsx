import { StyleSheet } from "react-native";
import {ColorProperties} from "../../Data/ColorProperties"

const buttonColor = ColorProperties.buttonColor;
const buttonTextColor = ColorProperties.buttonTextColor;
const inputBlockBackgroundColor = ColorProperties.inputBlockBackgroundColor;
const inputBlockBorderColor = ColorProperties.inputBlockBorderColor;
const lableColor = ColorProperties.lableColor
const errorColor = ColorProperties.errorBorderColor
const backgroundColor = ColorProperties.backgroundColor

export const AuthAndRegistrationStyle = StyleSheet.create({
  //Стиль для всей страницы
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    padding: 16,
    justifyContent: "center",
  },

  scrollView: {
    justifyContent: "center",
    flex: 1,
  },

  //Стиль блока с текстовыми полями
  inputBlock: {
    alignItems: "center",
    justifyContent: "center",
  },

  //Стиль блока с текстовым полем и наименованием поля
  authTextElementBox: {
    width: "80%",
  },

  //Стиль блока с адресом
  authTextElementBoxAddress: {
    width: "80%",
    zIndex: 4,
  },

  //Стиль инпут поля
  authTextInputElement: {
    borderColor: inputBlockBorderColor,
    borderWidth: 2,
    borderRadius: 2,
    paddingHorizontal: 8,
    height: 50,
    marginBottom: 15,
    paddingLeft: 10,
    zIndex: 1,
    backgroundColor: inputBlockBackgroundColor,
  },

  //Стиль для наименования поля
  labelInputText: {
    color: lableColor,
    paddingBottom: 15,
    marginLeft: "10%",
    fontSize: 32,
    fontWeight: "500",
  },

  //Стиль для блока с кнопками
  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 5,
  },

  //Стиль для каждой кнопки
  buttonElement: {
    borderWidth: 1,
    borderColor: buttonColor,
    borderStyle: "solid",
    borderRadius: 2,
    width: "40%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: buttonColor,
    height: 40,
  },

  //Стиль текста в кнопках
  buttonText: {
    color: buttonTextColor,
  },

  //Стиль для ошибок
  errorTextInput: {
    borderColor: errorColor, // Красная рамка
    borderWidth: 1,
  },

  errorTextBlock: {
    alignItems: "center",
    paddingBottom: 10,
    marginTop: -5
  },

  errorText: {
    color: errorColor,
    fontSize: 14,
    fontWeight: "500"
  }
});
