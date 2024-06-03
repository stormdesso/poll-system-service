import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Button, FlatList } from 'react-native';

import {ChatAboutThePollStyle} from "../style/ChatAboutThePollStyle"

const chatMessages = [
  {
    id: 1,
    user: "Иванов Иван Иванович",
    date: "2024-06-02T14:48:00.000Z",
    message: "Привет! Как дела?"
  },
  {
    id: 2,
    user: "Петров Петр Петрович",
    date: "2024-06-02T14:50:00.000Z",
    message: "Привет! Все хорошо, спасибо. Как ты?"
  },
  {
    id: 3,
    user: "Иванов Иван Иванович",
    date: "2024-06-02T14:55:00.000Z",
    message: "Тоже все отлично. Чем занимаешься?"
  }
];

export const ChatAboutThePoll = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const websocket = useRef(null);

  //"ws://echo.websocket.org"
  //"ws://192.168.0.159:8080"
  useEffect(() => {
    websocket.current = new WebSocket('ws://192.168.0.159:8080');

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
      websocket.current.onclose();
    }
  }, [])

  const sendMessage = () => {
    if (ws && message) {
      ws.current.send(message);
      setMessage('');
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