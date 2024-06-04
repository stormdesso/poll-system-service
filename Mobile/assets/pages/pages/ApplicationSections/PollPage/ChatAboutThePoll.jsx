import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';

import {ChatAboutThePollStyle} from "../../../style/ChatAboutThePollStyle"

    //"ws://echo.websocket.org"
    //"ws://192.168.0.159:8080"
    //ws://192.168.0.159:8080/gs-guide-websocket

export const ChatAboutThePoll = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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
        <Button title="Send"/>
      </View>
    </View>
  )
};