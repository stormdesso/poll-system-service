import React from "react";
import { Pressable, Text } from "react-native";

import { SimpleElementsStyle } from "../SimpleElementsStyle";

export default function Button({ label, onPress }) {
  return (
    <Pressable style={SimpleElementsStyle.buttonElement} onPress={onPress}>
      <Text style={SimpleElementsStyle.buttonText}>{label}</Text>
    </Pressable>
  );
}
