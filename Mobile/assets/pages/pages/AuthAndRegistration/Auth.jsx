import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { AuthAndRegistrationStyle } from "../../style/AuthAndRegistrationStyle";
import { ColorProperties } from "../../../Data/ColorProperties";

import validationDataInAuth from "../../../scripts/validationDataInAuth";
import GetToken from "../../../APIConnection/GetToken";
import {UsersRoleNavigation} from "../../../Data/UsersRoleNavigation"

import Input from "../../../elements/simpleElements/Input";
import InputPassword from "../../../elements/simpleElements/InputPassword";
import ButtonWithText from "../../../elements/simpleElements/ButtonWithText";

export const Auth = ({ navigation }) => {
  //Поле для хранения введенного логина
  const [loginInputValue, setLoginInputValue] = useState("");

  //Поле для хранения введенного пароля
  const [passwordInputValue, setPasswordInputValue] = useState("");

  //Состояние ошибок в полях
  const [getErrorStatus, setErrorStatus] = useState({
    login: false,
    password: false,
  });

  //Текст ошибок
  const [getErrorText, setErrorText] = useState("");

  //Состояние валидации
  const [getAuthSucsess, setAuthSucsess] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
    };

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);



  //Валидация данных и получение токена
  const validationData = async () => {
    const [statusError, textError, success] = validationDataInAuth(
      loginInputValue,
      passwordInputValue
    );
    Object.keys(statusError).forEach((key) => {
      setErrorStatus((prevError) => ({
        ...prevError,
        [key]: statusError[key],
      }));
    });
    setErrorText(textError);
    if (success) {
      const result = await GetToken(loginInputValue, passwordInputValue);
      if (result.success) {
        // Аутентификация прошла успешно, можно перейти на следующий экран или выполнить другие действия
        setAuthSucsess(result.success);
      } else {
        setErrorText(result.error);
        setAuthSucsess(result.success);
      }
    }
  };

  //Если валидация и получение токена прошли успешно, проверяем количество ролей у пользователя
  // и выводим окно выбора роли
  useEffect(() => {
    if (getAuthSucsess === true) {
      setAuthSucsess(false)
      SecureStore.getItemAsync('Role')
      .then(role => {
        let roles = JSON.parse(role)
        if(roles.length > 1)
        {
          navigation.navigate("RoleSelectionScreen", {roles})
        }
        else  
        {
          navigation.navigate(UsersRoleNavigation[roles[0]]);
          SecureStore.setItemAsync("userSelectedRole", roles[0])
        }
      })
      
    }
  }, [getAuthSucsess]);


  return (
    <SafeAreaView style={[AuthAndRegistrationStyle.container, {backgroundColor}]}>
      <Text style={AuthAndRegistrationStyle.labelInputText}>Авторизация</Text>
      <View style={AuthAndRegistrationStyle.inputBlock}>
        <Input
          label="Логин"
          value={loginInputValue}
          error={getErrorStatus.login}
          onChangeText={(text) => setLoginInputValue(text)}
          keyboardType="default"
          editable = {true}
        />

        <InputPassword
          label="Пароль"
          value={passwordInputValue}
          error={getErrorStatus.password}
          onChangeText={(text) => setPasswordInputValue(text)}
          keyboardType="default"
          editable={true}
        />
      </View>
      <View style={AuthAndRegistrationStyle.errorTextBlock}>
        <Text style={AuthAndRegistrationStyle.errorText}>{getErrorText}</Text>
      </View>
      <View style={AuthAndRegistrationStyle.buttonBlock}>
        <ButtonWithText
          label="Войти"
          onPress={() => {
            validationData();
          }}
        />
        <ButtonWithText
          label="Зарегистрироваться"
          onPress={() => navigation.navigate("Registration")}
        />
      </View>
    </SafeAreaView>
  );
};
