import { Auth } from "../../pages/pages/AuthAndRegistration/Auth";
import { UserPage } from "../../pages/pages/UsersPage/UserPage/UserPage";
import { Registration } from "../../pages/pages/AuthAndRegistration/Registration";
import {PollInfo} from "../../pages/pages/ApplicationSections/PollPage/PollInfo"

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

        <Stack.Screen
            name = "PollInfo"
            component={PollInfo}
            options={{ headerShown: false }}
        />
  </Stack.Navigator>
  );
}