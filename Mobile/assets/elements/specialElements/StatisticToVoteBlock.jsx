import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import {StatisticToVoteBlockStyle} from "../styleSpecialElements/StatisticToVoteBlockStyle"
import { ColorProperties } from '../../Data/ColorProperties';

export const StatisticToVoteBlock = ({pollValues, totalVotes}) => {
    const [color, setColor] = useState(ColorProperties.textColorInPollInfoCard);
  
    useEffect(() => {
      const updateColor = () => {
        setColor(ColorProperties.textColorInPollInfoCard);
      };
  
      ColorProperties.subscribe(updateColor);
      return () => ColorProperties.unsubscribe(updateColor);
    }, []);

    const renderOption = ({ item }) => {
        const percentage = (item.votes / totalVotes) * 100;
        return(
            <View style={StatisticToVoteBlockStyle.statisticBlock}>
                <Text style={[StatisticToVoteBlockStyle.optionText, {color}]}>{item.value}</Text>
                <View style={StatisticToVoteBlockStyle.progressBlock}>
                    <Progress.Bar 
                        progress={item.votes / totalVotes} 
                        width={null}
                        height={10}
                        color='#5C6BC0'
                        style={StatisticToVoteBlockStyle.progressBar}
                    />
                    <Text style={[StatisticToVoteBlockStyle.percentageText, {color}]}>{percentage.toFixed(2)}%</Text>
                </View>
            </View>
        )     
    };
    
    return (
        <View>
            <FlatList
                data={pollValues}
                renderItem={renderOption}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}