import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView, Alert } from "react-native";

import {PollSettingsStyle} from "../../../style/PollSettingsStyle"
import { ColorProperties } from "../../../../Data/ColorProperties";

import updatePoll from "../../../../APIConnection/updatePoll"
import { SearchProp } from '../../../../Data/SearchProp';

import Input from "../../../../elements/simpleElements/Input";
import InputBoxWithDropdown from "../../../../elements/simpleElements/InputBoxWithDropdown";
import InputWithCalendar from "../../../../elements/simpleElements/InputWithCalendar";
import ButtonWithText from "../../../../elements/simpleElements/ButtonWithText";
import AddPollValueInCreatePoll from "../../../../elements/specialElements/AddPollValueInCreatePoll"

import {CyclicalState} from "../../../../Data/CyclicalState"
import {CyclicalType} from "../../../../Data/CyclicalType"

import validationDataInCreatePoll from "../../../../scripts/validationDataInCreatePoll"
import deleteNonIntegerSymbol from "../../../../scripts/deleteNonIntegerSymbol"
import {formatDate} from "../../../../scripts/formatDate"

export const PollSettings = ({item}) => {

  //Цвета для темной темы
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);

  //Изменение текста в полях
  const [inputValues, setInputValues] = useState({
    name: item.name,
    description: item.description,
    startDate: formatDate(item.startDate),
    endDate: formatDate(item.endDate),
    cyclical: item.cyclical.toString(),
    maxNumberAnswersByUser: item.maxNumberAnswersByUser.toString(),
    newPollValue: item.pollValues.map(item => item.value),
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

  const [isEditable, setIsEditable] = useState(true)

  const [getErrorText, setErrorText] = useState("");

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
    };
    console.log(item)

    item.status === "proposed" ? setIsEditable(false) : setIsEditable(true)

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  //Метод на чистку полей
  const clearFields = () => {
    const clearedFields = Object.keys(inputValues).reduce((acc, key) => {
      acc[key] = Array.isArray(inputValues[key]) ? [""] : "";
      return acc;
    }, {});

    setInputValues(clearedFields);
  };

  //Изменение текста в полях для ввода данных
  const handleChangeText = (text, fieldName) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: text,
    }));
  };

  //Изменение текста в полях для ввода вариантов ответов
  const handleNewPollValueChange = (newPollValue) => {
    setInputValues((prevState) => ({
      ...prevState,
      newPollValue,
    }));
  };

  //Функция на валидацию данных
  const validationData = (status) => {
    const [statusError, textError] = validationDataInCreatePoll(inputValues);
    Object.keys(statusError).forEach((key) => {
      setErrorStatus((prevError) => ({
        ...prevError,
        [key]: statusError[key],
      }));
    });
    setErrorText(textError);
    if(textError === ""){
      item.status = status
      updatePoll(item)
      SearchProp.updatePoll(`${inputValues.name}`)
      Alert.alert(`Опрос успешно переведен в статус: ${status}`)
    }
  };

  return (
    <SafeAreaView style={[PollSettingsStyle.container, {backgroundColor}]}>
      <ScrollView contentContainerStyle={PollSettingsStyle.scrollView}>
        <View style={PollSettingsStyle.inputBlock}>
          <Input
            label="Наименование опроса"
            value={inputValues.name}
            error={getErrorStatus.name}
            onChangeText={(text) => handleChangeText(text, "name")}
            keyboardType="default"
            editable = {isEditable}
          />

          <Input
            label="Описание опроса"
            value={inputValues.description}
            error={getErrorStatus.description}
            onChangeText={(text) => handleChangeText(text, "description")}
            keyboardType="default"
            editable = {isEditable}
          />

          <InputWithCalendar
            label="Дата начала"
            value={inputValues.startDate}
            error={getErrorStatus.startDate}
            onChangeText={(text) => handleChangeText(text, "startDate")}
            keyboardType="default"
            editable={isEditable}
          />

          <InputWithCalendar
            label="Дата окончания"
            value={inputValues.endDate}
            error={getErrorStatus.endDate}
            onChangeText={(text) => handleChangeText(text, "endDate")}
            keyboardType="default"
            editable={isEditable}
          />

          <InputBoxWithDropdown
            label="Циклический опрос"
            value={inputValues.cyclical}
            error={getErrorStatus.cyclical}
            onChangeText={(text) => {
              handleChangeText(text, "cyclical");
            }}
            keyboardType="default"
            data = {CyclicalState}
            styleNameDropdown = {"CyclicalDropdown"}
            styleNameDropdownBox = {"CyclicalDropdownBox"}
            disabled={!isEditable}
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
            disabled={inputValues.cyclical !== "Опрос циклический" || !isEditable}
          />

          <Input
            label="Количество дней"
            value={inputValues.cyclicalDayPeriod}
            error={getErrorStatus.cyclicalDayPeriod}
            onChangeText={(text) =>
              handleChangeText(text, "cyclicalDayPeriod")
            }
            keyboardType="numeric"
            editable={inputValues.cyclicalType === 'Пользовательский' || isEditable}
          />

          <Input
            label="Максимальное количество голосов для выбора"
            value={inputValues.maxNumberAnswersByUser}
            error={getErrorStatus.maxNumberAnswersByUser}
            onChangeText={(text) =>
              handleChangeText(deleteNonIntegerSymbol(text), "maxNumberAnswersByUser")
            }
            keyboardType="numeric"
            editable={isEditable}
          />

          <AddPollValueInCreatePoll 
            newPollValue={inputValues.newPollValue}
            setNewPollValue={handleNewPollValueChange}
            error={getErrorStatus.newPollValue}
            editable={isEditable}
          />
        </View>
        <View style={PollSettingsStyle.errorTextBlock}>
          <Text style={PollSettingsStyle.errorText}>{getErrorText}</Text>
        </View>

        <View style={PollSettingsStyle.buttonBlock}>
          <ButtonWithText label="Принять" onPress={() => validationData("planned")} />

          <ButtonWithText label="Отклонить" onPress={() => validationData("returned")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );;
};
