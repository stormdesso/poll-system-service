import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Button, FlatList } from 'react-native';
import { Client } from '@stomp/stompjs';

import {ChatAboutThePollStyle} from "../../../style/ChatAboutThePollStyle"

export const ChatAboutThePoll = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const websocket = useRef(null);

  useEffect(() => {
    //"ws://echo.websocket.org"
    //"ws://192.168.0.159:8080"
    //ws://192.168.0.159:8080/gs-guide-websocket
    websocket.current = new WebSocket('ws://192.168.0.159:8080/gs-guide-websocket');

    // Обработчик событий при открытии соединения
    websocket.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    // Обработчик событий при закрытии соединения
    websocket.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Обработчик событий при получении сообщения
    websocket.current.onmessage = (event) => {
      console.log('Received message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Установка WebSocket в состояние
    setWs(websocket);

    return () => {
      websocket.current.close();
    }
  }, [])

  const sendMessage = () => {
    if (websocket.current && websocket.current.readyState === WebSocket.OPEN && message) {
      websocket.current.send(message);
      setMessage('');
    } else {
      console.log('WebSocket is not open or message is empty');
    }
  };

  return(
    <View style={ChatAboutThePollStyle.Container}>
      <View style={ChatAboutThePollStyle.MessageBox}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text >{item}</Text>
            </View>
          )}
        />
      </View>
      <View style={ChatAboutThePollStyle.SendMessageBlock}>
        <TextInput
          placeholder="Отправить сообщение"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  )
};