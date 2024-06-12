import React, { useState, useEffect } from 'react';
import { TextInput, View, Pressable, Text, Image } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";
import { ColorProperties } from '../../Data/ColorProperties';

import openEyeImage from "../../Img/Icon/open-eye.png";
import closeEyeImage from "../../Img/Icon/close-eye.png";

export default function InputPassword({ label, value, error, onChangeText }) {

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

  const [passwordVision, setPasswordVision] = useState({
    passwordInputVision: true,
    passwordInputVisionImage: closeEyeImage,
  });

  return (
    <View style={SimpleElementsStyle.authTextElementBox}>
      <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
      <View style={SimpleElementsStyle.passwordBox}>
        <TextInput
          placeholder={label}
          secureTextEntry={passwordVision.passwordInputVision}
          style={[
            SimpleElementsStyle.authTextInputElement,
            error === true ? SimpleElementsStyle.errorTextInput : null,
            {color},
            {backgroundColor},
            {borderColor}
          ]}
          onChangeText={onChangeText}
          placeholderTextColor={color}
          value={value}
        />
        <Pressable
          onPress={() => {
            setPasswordVision((prevState) => ({
              ...prevState,
              passwordInputVision: !passwordVision.passwordInputVision,
            }));
            passwordVision.passwordInputVision
              ? setPasswordVision((prevState) => ({
                  ...prevState,
                  passwordInputVisionImage: openEyeImage,
                }))
              : setPasswordVision((prevState) => ({
                  ...prevState,
                  passwordInputVisionImage: closeEyeImage,
                }));
          }}
          style={SimpleElementsStyle.passwordImageBox}
        >
          <Image 
            source={passwordVision.passwordInputVisionImage}
            style={SimpleElementsStyle.passwordImage}
            />
        </Pressable>
      </View>
      
    </View>
  );
}
