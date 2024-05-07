import MainNavigation from "./MainNavigation/MainNavigation"
import UserNavigation from "./usersTabNavigation/User/UserNavigation"

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="MainNavigation"
          component={MainNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserNavigation"
          component={UserNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
