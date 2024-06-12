import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Modal } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";
import { ColorProperties } from '../../Data/ColorProperties';

export default function InputWithCalendar({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
}) {

  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
  const [color, setTextColor] = useState(ColorProperties.textColor);
  const [borderColor, setBorderColor] = useState(ColorProperties.inputBlockBorderColor);

  useEffect(() => {
      const updateColor = () => {
        setBackgroundColor(ColorProperties.backgroundColor);
        setTextColor(ColorProperties.textColor)
        setBorderColor(ColorProperties.inputBlockBorderColor)
      };
  
      ColorProperties.subscribe(updateColor);
      return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    onChangeText(String(formattedDate));
    hideDatePicker();
  };

  return (
    <View style={SimpleElementsStyle.authTextElementBox}>
      <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={[
          SimpleElementsStyle.authTextInputElement,
          error === true ? SimpleElementsStyle.errorTextInput : null,
          {color},
          {backgroundColor},
          {borderColor}
        ]}
        onFocus={showDatePicker}
        value={value}
        placeholderTextColor={color}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
