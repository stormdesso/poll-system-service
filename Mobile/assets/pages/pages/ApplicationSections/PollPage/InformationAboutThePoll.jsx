import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import {InformationAboutThePollStyle} from "../../../style/InformationAboutThePollStyle"
import { ColorProperties } from "../../../../Data/ColorProperties";

import {ToVoteBlock} from "../../../../elements/specialElements/ToVoteBlock"
import {StatisticToVoteBlock} from "../../../../elements/specialElements/StatisticToVoteBlock"
import {FileListInPollInfo} from "../../../../elements/specialElements/FileListInPollInfo"

import GetFileInfo from "../../../../scripts/GetFileInfo"


export const InformationAboutThePoll = ({item}) => {

    const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
    const [color, setColor] = useState(ColorProperties.textColorInPollInfoCard);
    const [backgroundColorContainer, setBackgroundColorContainer] = useState(ColorProperties.containerColorInPollInfoCard);

    const [isVotedInPoll, setIsVotedInPoll] = useState()

    //Проверяет проголосовал ли пользователь в данном опросе
    useEffect(() => {
        setIsVotedInPoll(item.userIsVoted)
        const updateColor = () => {
            setBackgroundColor(ColorProperties.backgroundColor);
            setColor(ColorProperties.textColorInPollInfoCard)
            setBackgroundColorContainer(ColorProperties.containerColorInPollInfoCard)
          };
      
          ColorProperties.subscribe(updateColor);
          return () => ColorProperties.unsubscribe(updateColor);
    }, [])
 
    //Отправляется в метод голосования для обновления состояния
    const setCurrentPollIsVoted = (state) => {
        setIsVotedInPoll(state)
    }

    const {imageFilesArray, otherFilesArray} = GetFileInfo(item.id)

    return(
        <View style={[InformationAboutThePollStyle.Container, {backgroundColor}]}>
            <View style={[InformationAboutThePollStyle.InfoContainer, { backgroundColor: backgroundColorContainer, borderColor: backgroundColorContainer }]}>
                <Text style={[InformationAboutThePollStyle.InfoTextNameBlock, {color}]}>Описание опроса:</Text>
                <Text style={[InformationAboutThePollStyle.InfoTextDescription, {color}]}>   {item.description}</Text>
                {otherFilesArray.length > 0 ? (
                    <View style={InformationAboutThePollStyle.fileList}>
                        <Text style={[InformationAboutThePollStyle.InfoTextNameBlock, {color}]}>Список файлов:</Text>
                        <FileListInPollInfo pollId={item.id} selectFileId={otherFilesArray}/>
                    </View>
                ) : null}
            </View>
            {item.userIsVoted || isVotedInPoll ? (
                <View style={[InformationAboutThePollStyle.InfoContainer, { backgroundColor: backgroundColorContainer, borderColor: backgroundColorContainer }]}>
                    <Text style={[InformationAboutThePollStyle.InfoTextNameBlock, {color}]}>Статистика</Text>
                    <StatisticToVoteBlock 
                        pollValues = {item.pollValues}
                        totalVotes = {item.maxNumberVoted}
                    />
                </View>
            ) : (
                <View style={[InformationAboutThePollStyle.InfoContainer, { backgroundColor: backgroundColorContainer, borderColor: backgroundColorContainer }]}>
                    <Text style={[InformationAboutThePollStyle.InfoTextNameBlock, {color}]}>Проголосовать</Text>
                    <ToVoteBlock 
                        pollValues = {item.pollValues} 
                        maxAnswers = {item.maxNumberAnswersByUser} 
                        pollId={item.id}
                        isVotedState = {setCurrentPollIsVoted}
                    />
                </View>
            )}
        </View>
    )
}