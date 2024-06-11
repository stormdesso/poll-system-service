import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

import {StatisticToVoteBlockStyle} from "../styleSpecialElements/StatisticToVoteBlockStyle"

export const StatisticToVoteBlock = ({pollValues, totalVotes}) => {
    const renderOption = ({ item }) => {
        const percentage = (item.votes / totalVotes) * 100;
        return(
            <View style={StatisticToVoteBlockStyle.statisticBlock}>
                <Text style={StatisticToVoteBlockStyle.optionText}>{item.value}</Text>
                <View style={StatisticToVoteBlockStyle.progressBlock}>
                    <Progress.Bar 
                        progress={item.votes / totalVotes} 
                        width={null}
                        height={10}
                        color='#5C6BC0'
                        style={StatisticToVoteBlockStyle.progressBar}
                    />
                    <Text style={StatisticToVoteBlockStyle.percentageText}>{percentage.toFixed(2)}%</Text>
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