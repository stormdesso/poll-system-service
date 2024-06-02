import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {InformationAboutThePollStyle} from "../style/InformationAboutThePollStyle"

import {ToVoteBlock} from "../../elements/specialElements/ToVoteBlock"

export const InformationAboutThePoll = ({item}) => {
    console.log(item);
    return(
        <View style={InformationAboutThePollStyle.Container}>
            <View style={InformationAboutThePollStyle.InfoContainer}>
                <Text style={InformationAboutThePollStyle.InfoTextNameBlock}>Описание опроса</Text>
                <Text style={InformationAboutThePollStyle.InfoTextDescription}>{item.description}</Text>
            </View>
            <View style={InformationAboutThePollStyle.InfoContainer}>
                <Text style={InformationAboutThePollStyle.InfoTextNameBlock}>Проголосовать</Text>
                <ToVoteBlock pollValues = {item.pollValues} maxAnswers = {2} />
            </View>
        </View>
    )
}