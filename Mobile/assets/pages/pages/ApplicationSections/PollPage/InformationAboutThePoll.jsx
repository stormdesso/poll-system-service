import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import {InformationAboutThePollStyle} from "../../../style/InformationAboutThePollStyle"

import {ToVoteBlock} from "../../../../elements/specialElements/ToVoteBlock"
import {StatisticToVoteBlock} from "../../../../elements/specialElements/StatisticToVoteBlock"
import {FileListInPollInfo} from "../../../../elements/specialElements/FileListInPollInfo"

import GetFileInfo from "../../../../scripts/GetFileInfo"


export const InformationAboutThePoll = ({item}) => {

    const [isVotedInPoll, setIsVotedInPoll] = useState()

    //Проверяет проголосовал ли пользователь в данном опросе
    useEffect(() => {
        setIsVotedInPoll(item.userIsVoted)
    }, [])

    //Отправляется в метод голосования для обновления состояния
    const setCurrentPollIsVoted = (state) => {
        setIsVotedInPoll(state)
    }

    const {imageFilesArray, otherFilesArray} = GetFileInfo(item.id)

    return(
        <View style={InformationAboutThePollStyle.Container}>
            <View style={InformationAboutThePollStyle.InfoContainer}>
                <Text style={InformationAboutThePollStyle.InfoTextNameBlock}>Описание опроса</Text>
                <Text style={InformationAboutThePollStyle.InfoTextDescription}>{item.description}</Text>
                {otherFilesArray.length > 0 ? (
                    <FileListInPollInfo pollId={item.id} selectFileId={otherFilesArray}/>
                ) : null}
            </View>
            {item.userIsVoted || isVotedInPoll ? (
                <View style={InformationAboutThePollStyle.InfoContainer}>
                    <Text style={InformationAboutThePollStyle.InfoTextNameBlock}>Статистика</Text>
                    <StatisticToVoteBlock 
                        pollValues = {item.pollValues}
                        totalVotes = {item.maxNumberVoted}
                    />
                </View>
            ) : (
                <View style={InformationAboutThePollStyle.InfoContainer}>
                    <Text style={InformationAboutThePollStyle.InfoTextNameBlock}>Проголосовать</Text>
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