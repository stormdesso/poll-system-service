import React, { useState, useEffect } from "react";
import {
  TextInput,
  SafeAreaView,
  View,
  Pressable,
  Text,
  Image,
} from "react-native";
import { AuthPageStyle } from "../Style/AuthPageStyle";
import validationDataInAuth from "../scripts/validationDataInAuth";

import InputDataBlock from "../elements/InputDataBlock";
import InputPasswordBlock from "../elements/InputPasswordBlock";
import Button from "../elements/Button";

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

  const validationData = () => {
    const [statusError, textError] = validationDataInAuth(
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
  };

  useEffect(() => {
    // Проверяем, был ли сделан ввод данных и была ли выполнена валидация
    if (getErrorText === "true") {
      console.log(getErrorText);
      navigation.navigate("PollPage");
    }
  }, [getErrorText]);

  return (
    <SafeAreaView style={AuthPageStyle.container}>
      <Text style={AuthPageStyle.labelInputText}>Авторизация</Text>
      <View style={AuthPageStyle.inputBlock}>
        <InputDataBlock
          label="Логин"
          value={loginInputValue}
          error={getErrorStatus.login}
          onChangeText={(text) => setLoginInputValue(text)}
          keyboardType="default"
        />

        <InputPasswordBlock
          label="Пароль"
          value={passwordInputValue}
          error={getErrorStatus.password}
          onChangeText={(text) => setPasswordInputValue(text)}
          keyboardType="default"
        />
      </View>

      <View style={AuthPageStyle.buttonBlock}>
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
