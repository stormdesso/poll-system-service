import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Modal from 'react-native-modal';
import {UserSettingsModalStyle} from "../styleSpecialElements/UserSettingsModalStyle"
import { ColorProperties } from '../../Data/ColorProperties';
import user from "../../Img/Icon/user.png"

export const UserSettingsModal = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
  const [color, setTextColor] = useState(ColorProperties.userSettingsTextColor);
  const [countUserRoles, setCountUserRoles] = useState()
  let roles;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const updateColor = () => {
      setBackgroundColor(ColorProperties.backgroundColor);
      setTextColor(ColorProperties.userSettingsTextColor)
    };

    SecureStore.getItemAsync('Role')
      .then(role => {
        roles = JSON.parse(role)
        setCountUserRoles(roles.length)
        
      })

    ColorProperties.subscribe(updateColor);
    return () => ColorProperties.unsubscribe(updateColor);
  }, []);

  const useDarkTheme = () => {
    ColorProperties.toggleTheme();
  }

  const changeUserRole = () => {
    SecureStore.getItemAsync('Role')
      .then(role => {
        let roles = JSON.parse(role)
        navigation.navigate("RoleSelectionScreen", {roles})
      })
      toggleModal()
  }
  
  const MyAccount = () => {
    navigation.navigate("MyAccount")
    toggleModal()
  };

  const exit = () => {
    navigation.navigate("Auth")
    toggleModal()
  };

  return (
    <View style={UserSettingsModalStyle.container}>
        <TouchableOpacity style = {UserSettingsModalStyle.SortedButton} onPress={toggleModal}>
            <Image 
                source={user} 
                style = {UserSettingsModalStyle.Image}
            />
        </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={UserSettingsModalStyle.modal}
      >
        <View style={[UserSettingsModalStyle.modalContent, {backgroundColor}]}>
          <TouchableOpacity onPress={() => useDarkTheme()}>
            <Text style={[UserSettingsModalStyle.optionText, {color}]}>Темная тема</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => MyAccount()}>
            <Text style={[UserSettingsModalStyle.optionText, {color}]}>Мой аккаунт</Text>
          </TouchableOpacity>
          {countUserRoles > 1 && (
            <TouchableOpacity onPress={() => changeUserRole()}>
              <Text style={[UserSettingsModalStyle.optionText, {color}]}>Сменить роль</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => exit()}>
            <Text style={[UserSettingsModalStyle.optionText, {color}]}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default UserSettingsModal;
