import React from "react";
import { PollPage } from "../../../pages/pages/PollPage";
import { CreatePollPage } from "../../../pages/pages/CreatePollPage";
import { MyPollPage } from "../../../pages/pages/MyPollPage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const UserTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={"Опросы"} component={PollPage} />
      <Tab.Screen name={"Мои опросы"} component={MyPollPage} />
      <Tab.Screen name={"Создать опрос"} component={CreatePollPage} />
    </Tab.Navigator>
  );
};
