import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

import { ShortPollCardStyle } from "../styleSpecialElements/ShortPollCardStyle";
import TextInShortPollCard from "../simpleElements/TextInShortPollCard"


import {convertStatus} from "../../scripts/convertStatus"
import {convertDate} from "../../scripts/convertDate"

import calendar from "../../Img/shortPollCardImage/calendar.png"
import votes from "../../Img/shortPollCardImage/votes.png"
import status from "../../Img/shortPollCardImage/status.png"
import userIsVoted from "../../Img/shortPollCardImage/userIsVoted.png"

export const ShortPollCard = ({ item, onClick }) => {

  const gradientColor = {
    active: ['#66a1ff', '#18B7FB', '#0561ff'],
    planned: ['#858585', '#5C5C5C', '#474747'],
    proposed: ['#C6AEF8', '#A4B6FB', '#607ADC'],
    returned: ['#FF8D8D', '#ff5656', '#fc3048'],
    closed: ['#52da6b', '#19B37D', '#278A79'],
  }

  let data = `${convertDate(item.startDate)} - ${convertDate(item.endDate)}`
  let voted = `${item.numberVotes} / ${item.maxNumberVoted}`

  return (
    <View style={ShortPollCardStyle.Container}>
      <LinearGradient
        colors={gradientColor[item.status]} // Замените на ваши цвета
        locations={[0.4, 0.8, 1]}
        start={{ x: 0, y: 0 }} // Начало градиента в левом верхнем углу
        end={{ x: 1, y: 1 }} // Конец градиента в правом нижнем углу
        style={ShortPollCardStyle.ShortPollCard}
      >
        <TouchableOpacity onPress={() => onClick(item)} style={ShortPollCardStyle.BlocksInShoerPollCard}>
          <View>
            <Text style={ShortPollCardStyle.PollNameInShortCard}>{item.name}</Text>
            <TextInShortPollCard 
              text={"Статус:"}
              img={status}
              data={convertStatus(item.status)}
            />
            <TextInShortPollCard 
              text={""}
              img={calendar}
              data={data}
            />
            <TextInShortPollCard 
              text={"Проголосовало:"}
              img={votes}
              data={voted}
            />
          </View>
          <View style={ShortPollCardStyle.IsVotedStatusImage}>
            {item.userIsVoted && 
              <Image 
                source={userIsVoted}
              />
            }
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
    
  );
}