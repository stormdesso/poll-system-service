import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView, Alert } from "react-native";

import { AuthAndRegistrationStyle } from "../../style/AuthAndRegistrationStyle";
import { ColorProperties } from "../../../Data/ColorProperties";

import phoneNumberMask from "../../../scripts/phoneNumberMask";
import validationDataInRegistration from "../../../scripts/validationDataInRegistration";
import { transformObjectToRegistration } from "../../../scripts/transformObjectToRegistration";
import RegistrationAPI from "../../../APIConnection/RegistrationAPI"

import Input from "../../../elements/simpleElements/Input";
import InputPassword from "../../../elements/simpleElements/InputPassword";
import InputAddressWithDropDownList from "../../../elements/simpleElements/InputAddressWithDropDownList";
import InputWithCalendar from "../../../elements/simpleElements/InputWithCalendar";
import ButtonWithText from "../../../elements/simpleElements/ButtonWithText";

export const Registration = ({ navigation }) => {
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
    };

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  //Изменение текста в полях
  const [inputValues, setInputValues] = useState({
    fullName: "Пеленев Денис",
    birthdate: "07.01.2001",
    addressInfos: "г Пермь, ул улица 5, д 5, кв 2",
    login: "Reeji",
    password: "DENIS2486denis!",
    repeatPassword: "DENIS2486denis!",
    phoneNumber: "+7 (919) 471-70-86",
    email: "denis-pelenev@inbox.ru",
  });

  //Ошибки в полях
  const [getErrorStatus, setErrorStatus] = useState({
    fullName: false,
    birthdate: false,
    addressInfos: false,
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
    if(textError === ""){
      RegistrationAPI(inputValues.password, transformObjectToRegistration(inputValues))
      .then((result) => {
        if(result) {
          Alert.alert('Регистрация прошла успешно', 'Обратитесь к Управляющему домом для активации аккаунта. Спасибо за регистрацию!');
        }
      })
      .then(() => {
        navigation.navigate("Auth")
      })
      .catch((error) => {
        Alert.alert('Ошибка регистрации', error.message);
      });
    }

  };

  return (
    <SafeAreaView style={[AuthAndRegistrationStyle.container, {backgroundColor}]}>
      <ScrollView contentContainerStyle={AuthAndRegistrationStyle.scrollView}>
      <Text style={AuthAndRegistrationStyle.labelInputText}>Регистрация</Text>
        <View style={AuthAndRegistrationStyle.inputBlock}>
          <Input
            label="ФИО"
            value={inputValues.fullName}
            error={getErrorStatus.fullName}
            onChangeText={(text) => handleChangeText(text, "fullName")}
            keyboardType="default"
            editable = {true}
          />

          <InputWithCalendar
            label="Дата рождения"
            value={inputValues.birthdate}
            error={getErrorStatus.birthdate}
            onChangeText={(text) => handleChangeText(text, "birthdate")}
            keyboardType="default"
            editable={true}
          />

          <InputAddressWithDropDownList
            label="Адрес проживания"
            value={inputValues.addressInfos}
            error={getErrorStatus.addressInfos}
            onChangeText={(text) => {
              handleChangeText(text, "addressInfos");
            }}
            keyboardType="default"
          />

          <Input
            label="Логин"
            value={inputValues.login}
            error={getErrorStatus.login}
            onChangeText={(text) => handleChangeText(text, "login")}
            keyboardType="default"
            editable = {true}
          />

          <InputPassword
            label="Пароль"
            value={inputValues.password}
            error={getErrorStatus.password}
            onChangeText={(text) => handleChangeText(text, "password")}
            keyboardType="default"
            editable={true}
          />

          <InputPassword
            label="Повторите пароль"
            value={inputValues.repeatPassword}
            error={getErrorStatus.repeatPassword}
            onChangeText={(text) => handleChangeText(text, "repeatPassword")}
            keyboardType="default"
            editable={true}
          />

          <Input
            label="Номер телефона"
            value={inputValues.phoneNumber}
            error={getErrorStatus.phoneNumber}
            onChangeText={(text) =>
              handleChangeText(phoneNumberMask(text), "phoneNumber")
            }
            keyboardType="numeric"
            editable = {true}
          />

          <Input
            label="Электронная почта"
            value={inputValues.email}
            error={getErrorStatus.email}
            onChangeText={(text) => handleChangeText(text, "email")}
            keyboardType="default"
            editable = {true}
          />
        </View>
        <View style={AuthAndRegistrationStyle.errorTextBlock}>
          <Text style={AuthAndRegistrationStyle.errorText}>{getErrorText}</Text>
        </View>
        <View style={AuthAndRegistrationStyle.buttonBlock}>
          <ButtonWithText label="Зарегистрироваться" onPress={() => validationData()} />

          <ButtonWithText label="Назад" onPress={() => navigation.navigate("Auth")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
