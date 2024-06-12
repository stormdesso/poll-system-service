import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PollPage } from "../../pages/pages/ApplicationSections/PollPage/PollPage";
import {PollInfo} from "../../pages/pages/ApplicationSections/PollPage/PollInfo"
import {UserSettingsModal} from "../../elements/specialElements/UserSettingsModal";
import { Headder } from "../../elements/specialElements/Headder";

const Stack = createStackNavigator();

export const PollPageStackNavigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Перечень опросов"
          component={PollPage} // Заменил на UserTabNavigation
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Информация по опросу"
          component={PollInfo} // Заменил на UserTabNavigation
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
            name = "Headder"
            component={Headder}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name = "UserSettingsModal"
            component={UserSettingsModal}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}