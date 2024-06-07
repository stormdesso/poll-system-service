import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

import {CreatePollPageStyle} from "../../../style/CreatePollPageStyle"

import Input from "../../../../elements/simpleElements/Input";
import InputBoxWithDropdown from "../../../../elements/simpleElements/InputBoxWithDropdown";
import InputWithCalendar from "../../../../elements/simpleElements/InputWithCalendar";
import ButtonWithText from "../../../../elements/simpleElements/ButtonWithText";
import AddPollValueInCreatePoll from "../../../../elements/specialElements/AddPollValueInCreatePoll"

import {СyclicalState} from "../../../../Data/СyclicalState"
import {CyclicalType} from "../../../../Data/CyclicalType"

import validationDataInCreatePoll from "../../../../scripts/validationDataInCreatePoll"
import deleteNonIntegerSymbol from "../../../../scripts/deleteNonIntegerSymbol"

export const CreatePollPage = () => {
  //Изменение текста в полях
  const [inputValues, setInputValues] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    cyclical: "",
    cyclicalType: "",
    cyclicalDayPeriod: 0,
    maxNumberAnswersByUser: 0,
    newPollValue: [""]
  });

  //Ошибки в полях
  const [getErrorStatus, setErrorStatus] = useState({
    name: false,
    description: false,
    startDate: false,
    endDate: false, 
    cyclical: false,
    cyclicalType: false,
    cyclicalDayPeriod: false,
    maxNumberAnswersByUser: false,
    newPollValue: false,
  });

  const [getErrorText, setErrorText] = useState("");

  //Изменение текста в полях для ввода данных
  const handleChangeText = (text, fieldName) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  const handleNewPollValueChange = (newPollValue) => {
    setInputValues((prevState) => ({
      ...prevState,
      newPollValue,
    }));
  };

  //Функция на валидацию данных
  const validationData = () => {
    const [statusError, textError] = validationDataInCreatePoll(inputValues);
    Object.keys(statusError).forEach((key) => {
      setErrorStatus((prevError) => ({
        ...prevError,
        [key]: statusError[key],
      }));
    });
    setErrorText(textError);
  };

  return (
    <SafeAreaView style={CreatePollPageStyle.container}>
      <ScrollView contentContainerStyle={CreatePollPageStyle.scrollView}>
        <Text>Создать опрос</Text>
        <View style={CreatePollPageStyle.inputBlock}>
          <Input
            label="Наименование опроса"
            value={inputValues.name}
            error={getErrorStatus.name}
            onChangeText={(text) => handleChangeText(text, "name")}
            keyboardType="default"
            editable = {true}
          />

          <Input
            label="Описание опроса"
            value={inputValues.description}
            error={getErrorStatus.description}
            onChangeText={(text) => handleChangeText(text, "description")}
            keyboardType="default"
            editable = {true}
          />

          <InputWithCalendar
            label="Дата начала"
            value={inputValues.startDate}
            error={getErrorStatus.startDate}
            onChangeText={(text) => handleChangeText(text, "startDate")}
            keyboardType="default"
          />

          <InputWithCalendar
            label="Дата окончания"
            value={inputValues.endDate}
            error={getErrorStatus.endDate}
            onChangeText={(text) => handleChangeText(text, "endDate")}
            keyboardType="default"
          />

          <InputBoxWithDropdown
            label="Циклический опрос"
            value={inputValues.cyclical}
            error={getErrorStatus.cyclical}
            onChangeText={(text) => {
              handleChangeText(text, "cyclical");
            }}
            keyboardType="default"
            data = {СyclicalState}
            styleNameDropdown = {"CyclicalDropdown"}
            styleNameDropdownBox = {"CyclicalDropdownBox"}
            disabled={false}
          />

          <InputBoxWithDropdown
            label="Тип цикличности опроса"
            value={inputValues.cyclicalType}
            error={getErrorStatus.cyclicalType}
            onChangeText={(text) => {
              handleChangeText(text, "cyclicalType");
            }}
            keyboardType="default"
            data = {CyclicalType}
            styleNameDropdown = {"CyclicalTypeDropdown"}
            styleNameDropdownBox = {"CyclicalTypeDropdownBox"}
            disabled={inputValues.cyclical !== "Опрос циклический"}
          />

          <Input
            label="Количество дней"
            value={inputValues.cyclicalDayPeriod}
            error={getErrorStatus.cyclicalDayPeriod}
            onChangeText={(text) =>
              handleChangeText(text, "cyclicalDayPeriod")
            }
            keyboardType="numeric"
            editable={inputValues.cyclicalType === 'Пользовательский'}
          />

          <Input
            label="Максимальное количество голосов для выбора"
            value={inputValues.maxNumberAnswersByUser}
            error={getErrorStatus.maxNumberAnswersByUser}
            onChangeText={(text) =>
              handleChangeText(deleteNonIntegerSymbol(text), "maxNumberAnswersByUser")
            }
            keyboardType="numeric"
            editable={true}
          />

          <AddPollValueInCreatePoll 
            newPollValue={inputValues.newPollValue}
            setNewPollValue={handleNewPollValueChange}
            error={getErrorStatus.newPollValue}
          />
        </View>

        <View style={CreatePollPageStyle.buttonBlock}>
          <ButtonWithText label="Зарегистрироваться" onPress={() => validationData()} />

          <ButtonWithText label="Назад" onPress={() => navigation.navigate("Auth")} />
          <Text>{getErrorText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );;
};
