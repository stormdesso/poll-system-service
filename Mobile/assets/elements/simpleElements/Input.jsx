import React from "react";
import { TextInput, View, Text } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";

export default function Input({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
  editable
}) {

  return (
    <View style={SimpleElementsStyle.authTextElementBox}>
      <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={[
            editable === true ? SimpleElementsStyle.authTextInputElement : SimpleElementsStyle.authTextInputElementDisabled,
            error === true ? SimpleElementsStyle.errorTextInput : null,
          ]}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />   
    </View>
  );
}
