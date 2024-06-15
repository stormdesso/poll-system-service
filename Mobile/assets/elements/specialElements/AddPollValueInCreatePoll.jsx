import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';

import {AddPollValueInCreatePollStyle} from "../styleSpecialElements/AddPollValueInCreatePollStyle"
import { ColorProperties } from '../../Data/ColorProperties';

export default function AddPollValueInCreatePoll ({ newPollValue, setNewPollValue, error, editable }) {

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

  const handleTextChange = (text, index) => {
      const newInputs = [...newPollValue];
      newInputs[index] = text;

      // Добавляем новое поле, если последнее не пустое
      if (text !== '' && index === newPollValue.length - 1) {
          setNewPollValue([...newInputs, '']);
      } else {
      // Удаляем пустое поле, если текущее поле стало пустым и следующее тоже пустое
      if (text === '' && newInputs[index + 1] === '') {
          newInputs.pop();
      }
      setNewPollValue(newInputs);
      }
  };
  
    return (
      <View style={[AddPollValueInCreatePollStyle.container,
        editable === true ? [ {backgroundColor}, {color}, {borderColor}] : {backgroundColor: "gray", color: "white"}
      ]}>
        <Text style = {[editable === true ? [ {backgroundColor}, {color}, {borderColor}] : {backgroundColor: "gray", color: "white"}]}>Варианты голосования:</Text>
        {newPollValue.map((input, index) => (
          <TextInput
            key={index}
            style={[
              editable === true ? [ {backgroundColor}, {color}, {borderColor}] : {backgroundColor: "gray", color: "white"},
              error === false ? AddPollValueInCreatePollStyle.input : AddPollValueInCreatePollStyle.errorInput,
            ]}
            editable = {editable}
            value={input}
            onChangeText={(text) => handleTextChange(text, index)}
          />
        ))}
      </View>
    );
}