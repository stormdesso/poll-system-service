import React from "react";
import {PollPageStackNavigation} from "./PollPageStackNavigation"
import { CreatePollPage } from "../../../pages/pages/ApplicationSections/CreatePoll/CreatePollPage";
import { MyPollPage } from "../../../pages/pages/ApplicationSections/MyPoll/MyPollPage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const UserTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name={"Раздел Опросы"} component={PollPageStackNavigation} options={{ headerShown: false }}/>
      <Tab.Screen name={"Раздел Мои опросы"} component={MyPollPage} options={{ headerShown: false }}/>
      <Tab.Screen name={"Раздел Создать опрос"} component={CreatePollPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};
