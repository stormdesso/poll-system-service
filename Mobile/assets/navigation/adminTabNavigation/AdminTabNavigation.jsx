import React, { useState, useEffect } from 'react';
import {Image} from "react-native";
import {PollPageStackNavigation} from "./PollPageStackNavigation"
import { CreatePollPage } from "../../pages/pages/ApplicationSections/CreatePoll/CreatePollPage";
import { MyPollPage } from "../../pages/pages/ApplicationSections/MyPoll/MyPollPage";

import {TabNavigationStyle} from "../style/TabNavigationStyle"

import ConsiderPollActive from "../../Img/tabBarIcons/ConsiderPollActive.png"
import ConsiderPollUnActive from "../../Img/tabBarIcons/ConsiderPollUnActive.png"
import CreatePollActive from "../../Img/tabBarIcons/CreatePollActiveButton.png"
import CreatePollUnActiveButton from "../../Img/tabBarIcons/CreatePollUnActiveButton.png"
import PollListActive from "../../Img/tabBarIcons/PollListActive.png"
import PollListUnActive from "../../Img/tabBarIcons/PollListUnActive.png"
import {ColorProperties} from "../../Data/ColorProperties"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const AdminTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
  const [color, setTextColor] = useState(ColorProperties.textColor);

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
      setTextColor(ColorProperties.textColor)
    };

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Опросы') {
            iconName = focused ? PollListActive : PollListUnActive;
          } else if (route.name === 'Предложенные') {
            iconName = focused ? ConsiderPollActive : ConsiderPollUnActive;
          } else if (route.name === 'Создать опрос') {
            iconName = focused ? CreatePollActive : CreatePollUnActiveButton;
          }
          return <Image source={iconName} style={TabNavigationStyle.Image}/>;
        },
        tabBarActiveTintColor: color,
          tabBarInactiveTintColor: ColorProperties.textColor,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            paddingBottom: 5,
            paddingTop: 5
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
    >
      
      <Tab.Screen name={"Опросы"} component={PollPageStackNavigation} options={{ headerShown: false }}/>
      <Tab.Screen name={"Предложенные"} component={MyPollPage} options={{ headerShown: false }}/>
      <Tab.Screen name={"Создать опрос"} component={CreatePollPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};
