import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';

export default function AddPollValueInCreatePoll ({ newPollValue, setNewPollValue, error }) {

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
      <View style={styles.container}>
        <Text>Варианты голосования:</Text>
        {newPollValue.map((input, index) => (
          <TextInput
            key={index}
            style={error === false ? styles.input : styles.errorInput}
            value={input}
            onChangeText={(text) => handleTextChange(text, index)}
          />
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      width: "80%",
      margin: "auto",
      marginBottom: 5
    },
    input: {
        width: '97%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginLeft: '3%'
    },
    errorInput: {
        width: '97%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        marginLeft: '3%'
    },
  });