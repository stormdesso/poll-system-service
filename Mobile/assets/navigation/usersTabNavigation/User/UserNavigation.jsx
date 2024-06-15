import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserTabNavigation } from "./UserTabNavigation";

const Stack = createStackNavigator();

export default function UserNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom"
          component={UserTabNavigation} // Заменил на UserTabNavigation
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
