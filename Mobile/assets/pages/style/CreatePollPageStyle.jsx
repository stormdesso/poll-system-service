import { StyleSheet } from "react-native";
import { ColorProperties } from "../../Data/ColorProperties";

export const CreatePollPageStyle = StyleSheet.create({
  //Стиль для всей страницы
  container: {
    flex: 1,
    backgroundColor: ColorProperties.backgroundColor,
    padding: 16,
    justifyContent: "center",
  },

  HeadderText: {
    color: ColorProperties.lableColor,
    paddingBottom: 15,
    marginLeft: "10%",
    fontSize: 30,
    fontWeight: "500",
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
    borderColor: ColorProperties.inputBlockBorderColor,
    borderWidth: 2,
    borderRadius: 2,
    paddingHorizontal: 8,
    height: 50,
    marginBottom: 15,
    paddingLeft: 10,
    zIndex: 1,
    backgroundColor: ColorProperties.inputBlockBackgroundColor,
    color: ColorProperties.textColor,
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
  },

  //Стиль текста в кнопках
  buttonText: {
    color: ColorProperties.buttonTextColor,
  },

  //Стиль для ошибок
  errorTextInput: {
    borderColor: "red", // Красная рамка
    borderWidth: 1,
  },

  errorTextBlock: {
    alignItems: "center",
    paddingBottom: 10,
    marginTop: -5
  },

  errorText: {
    color: ColorProperties.errorBorderColor,
    fontSize: 14,
    fontWeight: "500"
  }
});
