import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

import { AuthAndRegistrationStyle } from "../style/AuthAndRegistrationStyle";

import phoneNumberMask from "../../scripts/phoneNumberMask";
import validationDataInRegistration from "../../scripts/validationDataInRegistration";

import Input from "../../elements/simpleElements/Input";
import InputPassword from "../../elements/simpleElements/InputPassword";
import InputBlockWithDropDownList from "../../elements/simpleElements/InputBlockWithDropDownList";
import InputWithCalendar from "../../elements/simpleElements/InputWithCalendar";
import Button from "../../elements/simpleElements/Button";

export const Registration = ({ navigation }) => {
  //Изменение текста в полях
  const [inputValues, setInputValues] = useState({
    name: "",
    dateBirth: "",
    address: "",
    login: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
    email: "",
  });

  //Ошибки в полях
  const [getErrorStatus, setErrorStatus] = useState({
    name: false,
    dateBirth: false,
    address: false,
    login: false,
    password: false,
    repeatPassword: false,
    phoneNumber: false,
    email: false,
  });

  const [getErrorText, setErrorText] = useState("");

  //Изменение текста в полях для ввода данных
  const handleChangeText = (text, fieldName) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  //Функция на валидацию данных
  const validationData = () => {
    const [statusError, textError] = validationDataInRegistration(inputValues);
    Object.keys(statusError).forEach((key) => {
      setErrorStatus((prevError) => ({
        ...prevError,
        [key]: statusError[key],
      }));
    });
    setErrorText(textError);
  };

  return (
    <SafeAreaView style={AuthAndRegistrationStyle.container}>
      <ScrollView contentContainerStyle={AuthAndRegistrationStyle.scrollView}>
        <View style={AuthAndRegistrationStyle.inputBlock}>
          <Input
            label="ФИО"
            value={inputValues.name}
            error={getErrorStatus.name}
            onChangeText={(text) => handleChangeText(text, "name")}
            keyboardType="default"
          />

          <InputWithCalendar
            label="Дата рождения"
            value={inputValues.dateBirth}
            error={getErrorStatus.dateBirth}
            onChangeText={(text) => handleChangeText(text, "dateBirth")}
            keyboardType="default"
          />

          <InputBlockWithDropDownList
            label="Адрес проживания"
            value={inputValues.address}
            error={getErrorStatus.address}
            onChangeText={(text) => {
              handleChangeText(text, "address");
            }}
            keyboardType="default"
          />

          <Input
            label="Логин"
            value={inputValues.login}
            error={getErrorStatus.login}
            onChangeText={(text) => handleChangeText(text, "login")}
            keyboardType="default"
          />

          <InputPassword
            label="Пароль"
            value={inputValues.password}
            error={getErrorStatus.password}
            onChangeText={(text) => handleChangeText(text, "password")}
            keyboardType="default"
          />

          <InputPassword
            label="Повторите пароль"
            value={inputValues.repeatPassword}
            error={getErrorStatus.repeatPassword}
            onChangeText={(text) => handleChangeText(text, "repeatPassword")}
            keyboardType="default"
          />

          <Input
            label="Номер телефона"
            value={inputValues.phoneNumber}
            error={getErrorStatus.phoneNumber}
            onChangeText={(text) =>
              handleChangeText(phoneNumberMask(text), "phoneNumber")
            }
            keyboardType="numeric"
          />

          <Input
            label="Электронная почта"
            value={inputValues.email}
            error={getErrorStatus.email}
            onChangeText={(text) => handleChangeText(text, "email")}
            keyboardType="default"
          />
        </View>

        <View style={AuthAndRegistrationStyle.buttonBlock}>
          <Button label="Зарегистрироваться" onPress={() => validationData()} />

          <Button label="Назад" onPress={() => navigation.navigate("Auth")} />
          <Text>{getErrorText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
