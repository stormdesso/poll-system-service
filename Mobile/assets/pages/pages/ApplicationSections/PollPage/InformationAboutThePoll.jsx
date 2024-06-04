import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import {InformationAboutThePollStyle} from "../../../style/InformationAboutThePollStyle"

import {ToVoteBlock} from "../../../../elements/specialElements/ToVoteBlock"
import {FileListInPollInfo} from "../../../../elements/specialElements/FileListInPollInfo"

import GetFileInfo from "../../../../scripts/GetFileInfo"


export const InformationAboutThePoll = ({item}) => {

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
            <View style={InformationAboutThePollStyle.InfoContainer}>
                <Text style={InformationAboutThePollStyle.InfoTextNameBlock}>Проголосовать</Text>
                <ToVoteBlock 
                    pollValues = {item.pollValues} 
                    maxAnswers = {item.maxNumberAnswersByUser} 
                    pollId={item.id}
                />
            </View>
        </View>
    )
}