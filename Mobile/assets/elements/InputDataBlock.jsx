import React from "react";
import { TextInput, View, Text } from "react-native";

import { AuthPageStyle } from "../Style/AuthPageStyle";

export default function InputDataBlock({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
}) {
  return (
    <View style={AuthPageStyle.authTextElementBox}>
      <Text style={AuthPageStyle.labelInputText}>{label}</Text>
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={[
          AuthPageStyle.authTextInputElement,
          error === true ? AuthPageStyle.errorTextInput : null,
        ]}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
