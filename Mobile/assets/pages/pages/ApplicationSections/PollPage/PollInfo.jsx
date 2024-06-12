import React, { useCallback, useEffect, useState } from 'react';
import { Image, Dimensions, View, Text, Pressable } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as SecureStore from 'expo-secure-store';
import { UsersRoleNavigation } from '../../../../Data/UsersRoleNavigation';

import {InformationAboutThePoll} from "./InformationAboutThePoll"
import {ChatAboutThePoll} from "./ChatAboutThePoll"

import {PollInfoStyle} from "../../../style/PollInfoStyle"
import { ColorProperties } from '../../../../Data/ColorProperties';
import {LinearGradient} from 'expo-linear-gradient';

import Back from "../../../../Img/Icon/Back.png"
  

export const PollInfo = ({ navigation, route }) => {
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
    };

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Информация' },
    { key: 'chat', title: 'Чат' },
  ]);

  const renderScene = useCallback(SceneMap({
    info: () => <InformationAboutThePoll item={route.params} />,
    chat: () => <ChatAboutThePoll item={route.params}/>,
  }), [route.params]);

  const gradientColor = {
    active: ['#66a1ff', '#18B7FB', '#0561ff'],
    planned: ['#858585', '#5C5C5C', '#474747'],
    proposed: ['#C6AEF8', '#A4B6FB', '#607ADC'],
    returned: ['#FF8D8D', '#ff5656', '#fc3048'],
    closed: ['#52da6b', '#19B37D', '#278A79'],
  }

  const renderTabBar = props => (
    <LinearGradient
        colors={gradientColor[route.params.status]} // Замените на ваши цвета
        locations={[0.4, 0.8, 1]}
        start={{ x: 0, y: 0 }} // Начало градиента в левом верхнем углу
        end={{ x: 1, y: 1 }} // Конец градиента в правом нижнем углу
        style={PollInfoStyle.ShortPollCard}
      >
        <View style={PollInfoStyle.TextBox}>
          <Pressable style = {PollInfoStyle.ImageBox} onPress={() => {
              SecureStore.getItemAsync('userSelectedRole')
                .then(role => {
                  navigation.navigate(UsersRoleNavigation[role])
                })
              
            }}>
            <Image 
              source={Back}
              style = {PollInfoStyle.Image}
            />
          </Pressable>
          <Text style={PollInfoStyle.Text}>{route.params.name}</Text>
        </View>
        <TabBar
          {...props}
          indicatorStyle={PollInfoStyle.indicator}
          style={PollInfoStyle.TabBar}
          labelStyle={PollInfoStyle.label}
          activeColor="#fff"
          inactiveColor="#cfcfcf"
        />
      </LinearGradient>
    
  );

  return (
    <View style={[PollInfoStyle.Headder, {backgroundColor}]}> 
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
    </View>
    
  );
}