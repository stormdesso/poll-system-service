import React, { useState, useEffect } from 'react';
import { TextInput, View, Text } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";
import { ColorProperties } from '../../Data/ColorProperties';

export default function Input({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
  editable
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

  return (
    <View style={SimpleElementsStyle.authTextElementBox}>
      <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={[
            editable === true ? SimpleElementsStyle.authTextInputElement : SimpleElementsStyle.authTextInputElementDisabled,
            error === true ? SimpleElementsStyle.errorTextInput : null,
            {color},
            {backgroundColor},
            {borderColor}
          ]}
          placeholderTextColor={color}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />   
    </View>
  );
}
