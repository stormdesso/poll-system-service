import React from 'react';
import { View, Text, Button } from 'react-native';
import {UsersRoleNavigation} from "../../Data/UsersRoleNavigation"

const RoleSelectionScreen = ({ route, navigation }) => {
  const { roles } = route.params;

  const navigateToRole = (role) => {
    let selectRole = UsersRoleNavigation[role]
    navigation.navigate(selectRole);
  };

  return (
    <View>
      <Text>Выберите роль:</Text>
      {roles.map((role) => (
        <Button key={role} title={role} onPress={() => navigateToRole(role)} />
      ))}
    </View>
  );
};

export default RoleSelectionScreen;