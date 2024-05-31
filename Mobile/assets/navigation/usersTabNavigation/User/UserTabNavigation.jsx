import React from "react";
import { PollPage } from "../../../pages/pages/PollPage";
import { CreatePollPage } from "../../../pages/pages/CreatePollPage";
import { MyPollPage } from "../../../pages/pages/MyPollPage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const UserTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={"Опросы"} component={PollPage} options={{ headerShown: false }}/>
      <Tab.Screen name={"Мои опросы"} component={MyPollPage} options={{ headerShown: false }}/>
      <Tab.Screen name={"Создать опрос"} component={CreatePollPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};
