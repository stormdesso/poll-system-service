import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {UsersRoleNavigation} from "../../Data/UsersRoleNavigation"

import {RoleSelectionScreenStyle} from "../styleSpecialElements/RoleSelectionScreenStyle"

const RoleSelectionScreen = ({ route, navigation }) => {
  const { roles } = route.params;

  const navigateToRole = (role) => {
    let selectRole = UsersRoleNavigation[role]
    navigation.navigate(selectRole);
  };

  return (
    <View style={RoleSelectionScreenStyle.RoleSelectionBox}>
      <Text style={RoleSelectionScreenStyle.LabelStyle}>Выберите роль:</Text>
      {roles.map((role) => (
        <TouchableOpacity 
          style={RoleSelectionScreenStyle.RoleButton}
          key={role} 
          onPress={() => navigateToRole(role)}
        >
          <Text style = {RoleSelectionScreenStyle.RoleNameText}>{role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RoleSelectionScreen;