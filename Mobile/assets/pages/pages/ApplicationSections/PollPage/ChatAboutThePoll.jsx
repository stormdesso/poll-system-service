import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    FlatList,
    StyleSheet,
    Pressable
} from 'react-native';

//import { Client } from '@stomp/stompjs';

import {getClientTimeZone} from "../../../../scripts/getClientTimeZone"
import {convertDate} from "../../../../scripts/convertDate"
import GetHistoryMessage from "../../../../APIConnection/GetHistoryMessage"
import * as SecureStore from 'expo-secure-store';
import SendMessage from '../../../../APIConnection/SendMessage';
import sendMessageImg from "../../../../Img/Icon/sendMessage.png"

import {ChatAboutThePollStyle} from "../../../style/ChatAboutThePollStyle"
import { ColorProperties } from '../../../../Data/ColorProperties';

    //"ws://echo.websocket.org"
    //"ws://192.168.0.159:8080"
    //ws://192.168.0.159:8080/gs-guide-websocket

export const ChatAboutThePoll = ({item}) => {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();
  const [historyMessages, setHistoryMessages] = useState([]);
  let supportDate = ""

  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
  const [color, setTextColor] = useState(ColorProperties.textColor);
  const [borderColor, setBorderColor] = useState(ColorProperties.inputBlockBorderColor);
  const { regionName, cityName } = getClientTimeZone();
  
  const fetchData = () => {
    GetHistoryMessage(item.id, regionName, cityName)
          .then((data) => {
            setHistoryMessages(data);
          })
  }

  //Получаем часовой пояс клиента при загрузке страницы
  useEffect(() => {
    SecureStore.getItemAsync('Id')
    .then(id => {
      setUserId(id)
    })

    fetchData()

    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
      setTextColor(ColorProperties.textColor)
      setBorderColor(ColorProperties.inputBlockBorderColor)
    };

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  },[])

  const sendMessage = () => {
    const now = new Date();

    let newMessage = {
      userId: userId,
      dateSentMessage: now.toISOString(),
      message: message
    }

    SendMessage(newMessage, item.id)
    .then((result) => {
      setMessage('')
      fetchData()
    })
    
  }



  return(
    <View style={ChatAboutThePollStyle.Container}>
      <View style={ChatAboutThePollStyle.MessageBox}>
        <FlatList
                data={historyMessages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  let sendMassageDate = convertDate(item.dateSentMessage)
                  const [date, houre] = sendMassageDate.split(" ")
                  // Проверка, изменилась ли дата
                  const showDate = supportDate !== date;
                  if (showDate) {
                    supportDate = date;
                  }
                  return (
                    <>
                      {showDate && (
                        <View style={ChatAboutThePollStyle.dateBlock}>
                          <Text style={ChatAboutThePollStyle.date}>{date}</Text>
                        </View>
                        
                      )}
                      <View style={item.userId == userId ? ChatAboutThePollStyle.messageUser : ChatAboutThePollStyle.messageOtherUser}>
                          <Text style={ChatAboutThePollStyle.userNameText}> {item.userId}    {houre}</Text>
                          <Text style={ChatAboutThePollStyle.messageText}> {item.message}</Text>
                      </View>
                    </>
                    
                  )   
                }}
            />
      </View>
      <View style={[ChatAboutThePollStyle.SendMessageBlock, {backgroundColor}, {borderColor}]}>
        <TextInput
          placeholder="Отправить сообщение"
          value={message}
          onChangeText={setMessage}
          style = {[ChatAboutThePollStyle.Input,
            {color},
            {backgroundColor},
          ]}
          placeholderTextColor={color}
        />
        <Pressable style = {ChatAboutThePollStyle.ImageBox} onPress={sendMessage}>
          <Image 
            source={sendMessageImg}
            style = {ChatAboutThePollStyle.Image}
          />
        </Pressable>
      </View>
    </View>
    );
};