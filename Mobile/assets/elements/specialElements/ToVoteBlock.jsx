import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {ToVoleBlockStyle} from "../styleSpecialElements/ToVoleBlockStyle"

import ToVote from "../../APIConnection/ToVote"

export const ToVoteBlock = ({pollValues, maxAnswers, pollId, isVotedState}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    //Определяет логику отметки выбранных элементов
    const handleSelection = (id) => {
        if (maxAnswers === 1) {
          setSelectedOptions([id]);
        } else {
          if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
          } else {
            if (selectedOptions.length < maxAnswers) {
              setSelectedOptions([...selectedOptions, id]);
            }
          }
        }
    };

    const handleVote = () => {
        console.log('Selected option IDs:', selectedOptions);
        ToVote(selectedOptions, pollValues, pollId)
        isVotedState(true)
    };

    
    const renderOption = ({ item }) => {
        const isSelected = selectedOptions.includes(item.id);
        return(
            <TouchableOpacity
                style={[ToVoleBlockStyle.option, isSelected && ToVoleBlockStyle.selectedOption]}
                onPress={() => handleSelection(item.id)}
            >
                <Text style={ToVoleBlockStyle.optionText}>{item.value}</Text>
            </TouchableOpacity>
        )
        
    };
    
    return (
        <View>
            <FlatList
                data={pollValues}
                renderItem={renderOption}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Проголосовать" onPress={handleVote} />
        </View>
    )
}