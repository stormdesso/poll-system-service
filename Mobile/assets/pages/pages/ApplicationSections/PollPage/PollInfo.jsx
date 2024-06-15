import React, { useCallback } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import {InformationAboutThePoll} from "./InformationAboutThePoll"
import {ChatAboutThePoll} from "./ChatAboutThePoll"

import {PollInfoStyle} from "../../../style/PollInfoStyle"

import {convertStatus} from "../../../../scripts/convertStatus"
import {convertDate} from "../../../../scripts/convertDate"
  

export const PollInfo = ({ route }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Информация' },
    { key: 'chat', title: 'Чат' },
  ]);

  const renderScene = useCallback(SceneMap({
    info: () => <InformationAboutThePoll item={route.params} />,
    chat: () => <ChatAboutThePoll item={route.params}/>,
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
    <>
      <View style={PollInfoStyle.ShortPollCard}>
            <View>
                <Text style={PollInfoStyle.Text}>{route.params.name}</Text>
                <Text style={PollInfoStyle.Text}>Статус: {convertStatus(route.params.status)}</Text>
            </View>
            <View>
                <Text style={PollInfoStyle.Text}>Сроки проведения: {convertDate(route.params.startDate)} - {convertDate(route.params.endDate)}</Text>
                <Text style={PollInfoStyle.Text}>Проголосовало: {route.params.numberVotes}/{route.params.maxNumberVoted}</Text>
            </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
}