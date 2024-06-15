import { StyleSheet } from "react-native";
import {ColorProperties} from "../../Data/ColorProperties"

export const SimpleElementsStyle = StyleSheet.create({
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
    zIndex: 5,
  },

  shadowBox: {
    width: "100%"
  },

  //Стиль инпут поля
  authTextInputElement: {
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 2,
    borderRadius: 7,
    paddingHorizontal: 8,
    height: 50,
    marginBottom: 15,
    paddingLeft: 10,
    zIndex: 1,
    backgroundColor: ColorProperties.inputBlockBackgroundColor,
    color: ColorProperties.textColor,
    width: "100%"
  },

  authTextInputElementDisabled: {
    borderColor: ColorProperties.textColor,
    borderWidth: 2,
    borderRadius: 7,
    paddingHorizontal: 8,
    height: 50,
    marginBottom: 15,
    paddingLeft: 10,
    zIndex: 1,
    backgroundColor: ColorProperties.disabledColor,
    color: "white",
    width: "100%"
  },

  //Стиль для выпадающего списка
  dropdown: {
    position: "absolute",
    left: 0,
    top: 230,
    marginLeft: "10%",
    right: 0,
    zIndex: 4,
    backgroundColor: "#FFF",
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 1,
    width: "80%",
  },

  textInDropdown: {
    padding: 10,
    borderBottomColor: ColorProperties.inputBlockBorderColor,
    borderBottomWidth: 0.5
  },

  //Стиль для выпадающего списка цикличности
  CyclicalDropdown: {
    position: "absolute",
    left: 0,
    top: 400,
    marginLeft: "10%",
    right: 0,
    zIndex: 5,
    backgroundColor: "#FFF",
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 1,
    width: "80%",
  },

  CyclicalDropdownBox: {
    width: "80%",
    zIndex: 5,
  },

  //Стиль для выпадающего списка типа цикличности
  CyclicalTypeDropdown: {
    position: "absolute",
    left: 0,
    top: 485,
    marginLeft: "10%",
    right: 0,
    zIndex: 3,
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
  },

  CyclicalTypeDropdownBox: {
    width: "80%",
    zIndex: 4,
  },

  //Стиль для выпадающего списка статусов
  StatusDropdown: {
    position: "absolute",
    left: 0,
    top: 60,
    marginLeft: "10%",
    right: 0,
    zIndex: 2,
    backgroundColor: "#FFF",
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 2,
    width: "80%",
  },

  StatusDropdownBox: {
    width: "80%",
    zIndex: 3,
  },

  //Стиль для выпадающего списка цикличности в фильтрах
  IsCyclicalDropdown: {
    position: "absolute",
    left: 0,
    top: 315,
    marginLeft: "10%",
    right: 0,
    zIndex: 5,
    backgroundColor: "#FFF",
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 1,
    width: "80%",
  },

  IsCyclicalDropdownBox: {
    width: "80%",
    zIndex: 6,
  },

  //Стиль для выпадающего списка проголосовал или нет в фильтрах
  IsVoitedDropdown: {
    position: "absolute",
    left: 0,
    top: 400,
    marginLeft: "10%",
    right: 0,
    zIndex: 3,
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
  },

  IsVoitedDropdownBox: {
    width: "80%",
    zIndex: 4,
  },

  //Стиль для наименования поля
  labelInputText: {
    color: ColorProperties.textColor,
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
    borderColor: ColorProperties.buttonColor,
    borderStyle: "solid",
    borderRadius: 2,
    width: "40%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorProperties.buttonColor,
    height: 40,
    zIndex: 1
  },

  //Стиль текста в кнопках
  buttonText: {
    color: ColorProperties.buttonTextColor,
  },

  //Стиль для ошибок
  errorTextInput: {
    borderColor: "red", // Красная рамка
  },

  //Стиль для поля с паролем
  passwordBox: {
    flexDirection: "row",
  },

  passwordImageBox: {
    position: "absolute",
    right: 0,
    zIndex: 2,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  passwordImage: {
    width: 25,
    height: 25,
    zIndex: 2,
  }
});
