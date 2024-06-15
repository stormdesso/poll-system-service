import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native';

//import { Client } from '@stomp/stompjs';

import {getClientTimeZone} from "../../../../scripts/getClientTimeZone"
import {convertDate} from "../../../../scripts/convertDate"
import GetHistoryMessage from "../../../../APIConnection/GetHistoryMessage"

import {ChatAboutThePollStyle} from "../../../style/ChatAboutThePollStyle"

    //"ws://echo.websocket.org"
    //"ws://192.168.0.159:8080"
    //ws://192.168.0.159:8080/gs-guide-websocket

export const ChatAboutThePoll = ({item}) => {
  const [message, setMessage] = useState('');
  const [historyMessages, setHistoryMessages] = useState([]);
  let supportDate = ""

  //Получаем часовой пояс клиента при загрузке страницы
  useEffect(() => {
    const { regionName, cityName } = getClientTimeZone();
    GetHistoryMessage(item.id, regionName, cityName)
          .then((data) => {
            setHistoryMessages(data);
          })
  },[])

  // const stompClient = useRef(null);
  //   const [connected, setConnected] = useState(false);
  //   const [name, setName] = useState('');
  //   const [messages, setMessages] = useState([]);

    
  //   useEffect(() => {
  //       stompClient.current = new Client({
  //           brokerURL: 'ws://192.168.0.159:8080/gs-guide-websocket',
  //           debug: (str) => {
  //               console.log(new Date(), str);
  //           },
  //       });

  //       stompClient.current.onConnect = (frame) => {
  //           console.log('Connected: ' + frame);
  //           console.log('УРА!');
  //           setConnected(true);
  //           stompClient.current.subscribe('/topic/greetings', (message) => {
  //               showGreeting(JSON.parse(message.body).content);
  //           });
  //       };

  //       stompClient.current.onStompError = (frame) => {
  //           console.error('Broker reported error: ' + frame.headers['message']);
  //           console.error('Additional details: ' + frame.body);
  //       };

  //       stompClient.current.onWebSocketError = (error) => {
  //           console.error('WebSocket error: ' + error);
  //       };

  //       stompClient.current.onDisconnect = () => {
  //           console.log('Disconnected');
  //           setConnected(false);
  //       };
  //   }, []);

  //   const connect = () => {
  //       if (!connected && stompClient.current) {
  //           console.log('Activating STOMP client...');
  //           stompClient.current.activate();
  //       }
  //   };

  //   const disconnect = () => {
  //       if (stompClient.current && connected) {
  //           console.log('Deactivating STOMP client...');
  //           stompClient.current.deactivate();
  //       }
  //   };

  //   const sendName = () => {
  //     if (stompClient.current && connected && name) {
  //         console.log('Sending name: ' + name);
  //         stompClient.current.publish({
  //             destination: '/app/hello',
  //             body: JSON.stringify({ 'name': name })
  //         });
  //     } else {
  //         console.log('STOMP client is not connected or name is empty.');
  //     }
  // };

  //   const showGreeting = (message) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //   };

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
                      {showDate && <Text>{date}</Text>}
                      <View style={styles.message}>
                          <Text><Text style={styles.bold}>User ID:</Text> {item.userId}</Text>
                          <Text><Text style={styles.bold}>Date Sent:</Text> {houre}</Text>
                          <Text><Text style={styles.bold}>Message:</Text> {item.message}</Text>
                      </View>
                    </>
                    
                  )   
                }}
            />
      </View>
      <View style={ChatAboutThePollStyle.SendMessageBlock}>
        <Button title="Send"/>
        <TextInput
          placeholder="Отправить сообщение"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send"/>
      </View>
    </View>
    // <View style={styles.container}>
    //         <TextInput
    //             style={styles.input}
    //             placeholder="Enter your name"
    //             value={name}
    //             onChangeText={setName}
    //         />
    //         <Button title="Connect" onPress={connect} disabled={connected} />
    //         <Button title="Disconnect" onPress={disconnect} disabled={!connected} />
    //         <Button title="Send" onPress={sendName} />
    //         <FlatList
    //             data={messages}
    //             renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
    //             keyExtractor={(item, index) => index.toString()}
    //         />
    //     </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
  },
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
  },
  message: {
      padding: 10,
      fontSize: 18,
  },
});