import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import ToVote from "../../APIConnection/ToVote"

export const ToVoteBlock = ({pollValues, maxAnswers, pollId}) => {
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
    };

    
    const renderOption = ({ item }) => {
        const isSelected = selectedOptions.includes(item.id);
        return(
            <TouchableOpacity
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => handleSelection(item.id)}
            >
                <Text style={styles.optionText}>{item.value}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    selectedOption: {
        backgroundColor: '#d3d3d3', // Цвет заднего фона для выбранного элемента
    },
    optionText: {
        marginLeft: 8,
    },
});