import React from "react";
import { Pressable, Text } from "react-native";

import { AuthPageStyle } from "../Style/AuthPageStyle";

export default function Button({ label, onPress }) {
  return (
    <Pressable style={AuthPageStyle.buttonElement} onPress={onPress}>
      <Text style={AuthPageStyle.buttonText}>{label}</Text>
    </Pressable>
  );
}
