import React from "react";
import { TextInput, View, Text } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";

export default function Input({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
}) {
  return (
    <View style={SimpleElementsStyle.authTextElementBox}>
      <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={[
          SimpleElementsStyle.authTextInputElement,
          error === true ? SimpleElementsStyle.errorTextInput : null,
        ]}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
