import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";
import { ColorProperties } from '../../Data/ColorProperties';

export default function InputBoxWithDropdown({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
  data,
  styleNameDropdown,
  styleNameDropdownBox,
  disabled
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

  const [isListOpen, setIsListOpen] = useState(false);
  const [dropdownItems, setDropdownItems ] = useState(value)

  useEffect(() => {
    setDropdownItems(value)
  }, [value])

  //Вызывается при выборе элемента
  const handleChangeText = (value) => {
    setDropdownItems(value)
    onChangeText(value);
    setIsListOpen(false);
  };

  const renderDropdownItems = () => {
    return Object.keys(data).map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleChangeText(item)}
      >
        <Text style={[SimpleElementsStyle.textInDropdown, {color}, {borderColor}]}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <View style={SimpleElementsStyle[styleNameDropdownBox]}>
        <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
        <TouchableOpacity 
            onPress = {() => {
                setIsListOpen(true);
            }}
            activeOpacity={1}
            disabled={disabled}>
            <TextInput
                editable={false}
                placeholder={label}
                keyboardType={keyboardType}
                style={[
                    disabled === false ? [SimpleElementsStyle.authTextInputElement, {backgroundColor}] : SimpleElementsStyle.authTextInputElementDisabled,
                    error === true ? SimpleElementsStyle.errorTextInput : null,
                    {color},
                    {borderColor}
            ]}
            value={dropdownItems}
            placeholderTextColor={disabled === false ? color : "white"}
            />
        </TouchableOpacity>
      </View>
      {isListOpen && (
        <View style={[SimpleElementsStyle[styleNameDropdown], {backgroundColor}, {borderColor}]}>{renderDropdownItems()}</View>
      )}
    </>
  );
}