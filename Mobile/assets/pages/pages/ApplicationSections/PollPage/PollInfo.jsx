import React, { useCallback } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import {InformationAboutThePoll} from "./InformationAboutThePoll"
import {ChatAboutThePoll} from "./ChatAboutThePoll"

import {PollInfoStyle} from "../../../style/PollInfoStyle"
  

export const PollInfo = ({ route }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Информация' },
    { key: 'chat', title: 'Чат' },
  ]);

  const renderScene = useCallback(SceneMap({
    info: () => <InformationAboutThePoll item={route.params} />,
    chat: () => <ChatAboutThePoll />,
  }), [route.params]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={PollInfoStyle.indicator}
      style={PollInfoStyle.tabBar}
      labelStyle={PollInfoStyle.label}
      activeColor="#fff"
      inactiveColor="#999"
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
  );
}