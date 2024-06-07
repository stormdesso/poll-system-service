import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AdminTabNavigation } from "./AdminTabNavigation";

const Stack = createStackNavigator();

export default function AdminNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom"
          component={AdminTabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
