import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { AuthAndRegistrationStyle } from "../style/AuthAndRegistrationStyle";

import validationDataInAuth from "../../scripts/validationDataInAuth";
import GetToken from "../../APIConnection/GetToken";

import Input from "../../elements/simpleElements/Input";
import InputPassword from "../../elements/simpleElements/InputPassword";
import Button from "../../elements/simpleElements/Button";

export const Auth = ({ navigation }) => {
  //Поле для хранения введенного логина
  const [loginInputValue, setLoginInputValue] = useState("");
  //Поле для хранения введенного пароля
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const [getErrorStatus, setErrorStatus] = useState({
    login: false,
    password: false,
  });

  const [getErrorText, setErrorText] = useState("");
  const [getAuthSucsess, setAuthSucsess] = useState(false);

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
    GetToken();
    if (success) {
      const result = await GetToken(loginInputValue, passwordInputValue);
      console.log(result)
      if (result.success) {
        // Аутентификация прошла успешно, можно перейти на следующий экран или выполнить другие действия
        setAuthSucsess(result.success);
      } else {
        setErrorText(result.error);
        setAuthSucsess(result.success);
      }
    }
  };

  useEffect(() => {
    // Проверяем, был ли сделан ввод данных и была ли выполнена валидация
    if (getAuthSucsess === true) {
      setAuthSucsess(false)
      navigation.navigate("UserPage");
    }
  }, [getAuthSucsess]);

  return (
    <SafeAreaView style={AuthAndRegistrationStyle.container}>
      <Text style={AuthAndRegistrationStyle.labelInputText}>Авторизация</Text>
      <View style={AuthAndRegistrationStyle.inputBlock}>
        <Input
          label="Логин"
          value={loginInputValue}
          error={getErrorStatus.login}
          onChangeText={(text) => setLoginInputValue(text)}
          keyboardType="default"
        />

        <InputPassword
          label="Пароль"
          value={passwordInputValue}
          error={getErrorStatus.password}
          onChangeText={(text) => setPasswordInputValue(text)}
          keyboardType="default"
        />
      </View>

      <View style={AuthAndRegistrationStyle.buttonBlock}>
        <Button
          label="Войти"
          onPress={() => {
            validationData();
          }}
        />
        <Button
          label="Зарегистрироваться"
          onPress={() => navigation.navigate("Registration")}
        />
      </View>
      <Text>{getErrorText}</Text>
    </SafeAreaView>
  );
};
