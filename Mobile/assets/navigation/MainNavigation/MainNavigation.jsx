import { Auth } from "../../pages/pages/Auth";
import { UserPage } from "../../pages/pages/UserPage";
import { Registration } from "../../pages/pages/Registration";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="UserPage"
            component={UserPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
        />
  </Stack.Navigator>
  );
}