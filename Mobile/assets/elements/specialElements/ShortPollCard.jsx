import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShortPollCardStyle } from "../styleSpecialElements/ShortPollCardStyle";

import {convertStatus} from "../../scripts/convertStatus"
import {convertDate} from "../../scripts/convertDate"


export const ShortPollCard = ({ item, onClick }) => {

  return (
    <TouchableOpacity onPress={() => onClick(item)} style={ShortPollCardStyle.ShortPollCard}>
        <View>
            <View>
                <Text style={ShortPollCardStyle.Text}>{item.name}</Text>
                <Text style={ShortPollCardStyle.Text}>Статус: {convertStatus(item.status)}</Text>
            </View>
            <View>
                <Text style={ShortPollCardStyle.Text}>Сроки проведения: {convertDate(item.startDate)} - {convertDate(item.endDate)}</Text>
                <Text style={ShortPollCardStyle.Text}>Проголосовало: {item.numberVotes}/{item.maxNumberVoted}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
}