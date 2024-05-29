import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SpecialElementsStyle } from "../SpecialElementsStyle";

import {convertStatus} from "../../scripts/convertStatus"
import {convertDate} from "../../scripts/convertDate"


export const ShortPollCard = ({ item }) => {
    const onPress = () => {
        console.log(item.name)
    }

  return (
    <TouchableOpacity onPress={onPress} style={SpecialElementsStyle.ShortPollCard}>
        <View>
            <View>
                <Text style={SpecialElementsStyle.Text}>{item.name}</Text>
                <Text style={SpecialElementsStyle.Text}>Статус: {convertStatus(item.status)}</Text>
            </View>
            <View>
                <Text style={SpecialElementsStyle.Text}>Сроки проведения: {convertDate(item.startDate)} - {convertDate(item.endDate)}</Text>
                <Text style={SpecialElementsStyle.Text}>Проголосовало: {item.numberVotes}/{item.maxNumberVoted}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
}