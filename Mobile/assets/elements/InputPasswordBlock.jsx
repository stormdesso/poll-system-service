import React, { useState } from "react";
import { TextInput, View, Pressable, Text, Image } from "react-native";

import { AuthPageStyle } from "../Style/AuthPageStyle";

import openEyeImage from "../img/open-eye.png";
import closeEyeImage from "../img/close-eye.png";

export default function InputPasswordBlock({
  label,
  value,
  error,
  onChangeText,
}) {
  const [passwordVision, setPasswordVision] = useState({
    passwordInputVision: true,
    passwordInputVisionImage: closeEyeImage,
  });

  return (
    <View style={AuthPageStyle.authTextElementBox}>
      <Text style={AuthPageStyle.labelInputText}>{label}</Text>
      <TextInput
        placeholder={label}
        secureTextEntry={passwordVision.passwordInputVision}
        style={[
          AuthPageStyle.authTextInputElement,
          error === true ? AuthPageStyle.errorTextInput : null,
        ]}
        onChangeText={onChangeText}
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
      >
        <Image source={passwordVision.passwordInputVisionImage} />
      </Pressable>
    </View>
  );
}
