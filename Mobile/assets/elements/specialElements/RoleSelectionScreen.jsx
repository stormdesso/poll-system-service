import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {UsersRoleNavigation} from "../../Data/UsersRoleNavigation"
import * as SecureStore from 'expo-secure-store';
import {RoleSelectionScreenStyle} from "../styleSpecialElements/RoleSelectionScreenStyle"
import { ColorProperties } from '../../Data/ColorProperties';

const RoleSelectionScreen = ({ route, navigation }) => {
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
  const [borderColor, setBorderColor] = useState(ColorProperties.inputBlockBorderColor);
  const { roles } = route.params;

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
      setBorderColor(ColorProperties.inputBlockBorderColor)
    };

    console.log(roles)

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  

  const navigateToRole = (role) => {
    SecureStore.setItemAsync("userSelectedRole", role)
    let selectRole = UsersRoleNavigation[role]
    navigation.navigate(selectRole);
  };
  

  return (
    <View style={[RoleSelectionScreenStyle.RoleSelectionBox, { backgroundColor }]}>
      <Text style={RoleSelectionScreenStyle.LabelStyle}>Выберите роль:</Text>
      {roles.map((role) => (
        role !== "root" && (
          <TouchableOpacity 
            style={[RoleSelectionScreenStyle.RoleButton, { borderColor, backgroundColor }]}
            key={role} 
            onPress={() => navigateToRole(role)}
          >
            <Text style={RoleSelectionScreenStyle.RoleNameText}>{role}</Text>
          </TouchableOpacity>
        )
      ))}
      {roles.includes("root") && (
        <View style={[RoleSelectionScreenStyle.RoleNameTextRootBox, { backgroundColor }]}>
          <Text style={RoleSelectionScreenStyle.RoleNameTextRoot}>
            Авторизация под системной ролью "Супер-пользователь" не доступна в мобильной версии приложения "Мой дом"
          </Text>
        </View>
      )}
    </View>
  );
};

export default RoleSelectionScreen;