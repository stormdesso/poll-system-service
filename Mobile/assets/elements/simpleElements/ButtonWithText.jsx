import React from "react";
import { Pressable, Text } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";

export default function ButtonWithText({ label, onPress }) {
  return (
    <Pressable style={SimpleElementsStyle.buttonElement} onPress={onPress}>
      <Text style={SimpleElementsStyle.buttonText}>{label}</Text>
    </Pressable>
  );
}
