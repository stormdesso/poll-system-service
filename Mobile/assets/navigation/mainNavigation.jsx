import { Auth } from "../pages/Auth";
import { PollPage } from "../pages/PollPage";
import { Registration } from "../pages/Registration";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function mainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PollPage"
          component={PollPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
