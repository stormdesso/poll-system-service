import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const InfoRoute = () => (
    <View style={styles.scene}>
      <Text>InfoRoute</Text>
    </View>
  );
  
  const ChatRoute = () => (
    <View style={styles.scene}>
      <Text>Chat Section</Text>
    </View>
  );

export const PollInfo = ({ route }) => {
    const { item } = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'info', title: 'Информация' },
    { key: 'chat', title: 'Чат' },
  ]);

  const renderScene = SceneMap({
    info: InfoRoute,
    chat: ChatRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => <TabBar {...props} />}
    />
  );
}

const styles = StyleSheet.create({
    scene: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});