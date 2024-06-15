import { StyleSheet } from "react-native";

const buttonColor = "#304FFE";
const buttonTextColor = "#fff";
const inputBlockBackgroundColor = "#E8EAF6";
const inputBlockBorderColor = "#9FA9DA";
const textColor = "#9E9E9E";

export const AuthAndRegistrationStyle = StyleSheet.create({
  //Стиль для всей страницы
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
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
    color: textColor,
  },

  //Стиль для выпадающего списка
  dropdown: {
    position: "absolute",
    left: 0,
    top: 230,
    marginLeft: "10%",
    right: 0,
    zIndex: 2,
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
  },

  //Стиль для наименования поля
  labelInputText: {
    color: textColor,
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
    borderColor: "red", // Красная рамка
    borderWidth: 1,
  },
});
