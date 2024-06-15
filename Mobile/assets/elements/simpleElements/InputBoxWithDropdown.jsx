import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";

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
  const [isListOpen, setIsListOpen] = useState(false);
  const [dropdownItems, setDropdownItems ] = useState('')

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
        <Text style={{ padding: 10 }}>{item}</Text>
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
                    disabled === false ? SimpleElementsStyle.authTextInputElement : SimpleElementsStyle.authTextInputElementDisabled,
                    error === true ? SimpleElementsStyle.errorTextInput : null,
            ]}
            value={dropdownItems}
            />
        </TouchableOpacity>
      </View>
      {isListOpen && (
        <View style={SimpleElementsStyle[styleNameDropdown]}>{renderDropdownItems()}</View>
      )}
    </>
  );
}