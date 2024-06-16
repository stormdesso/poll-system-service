import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";
import { ColorProperties } from '../../Data/ColorProperties';
import AddressApiToRegistration from "../../APIConnection/addressApiToRegistration";

export default function InputAddressWithDropDownList({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
  page
}) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [addressInfo, setAddressInfo] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
  const [color, setTextColor] = useState(ColorProperties.textColor);
  const [borderColor, setBorderColor] = useState(ColorProperties.inputBlockBorderColor);

  useEffect(() => {
      const updateColor = () => {
        setBackgroundColor(ColorProperties.backgroundColor);
        setTextColor(ColorProperties.textColor)
        setBorderColor(ColorProperties.inputBlockBorderColor)
      };
  
      ColorProperties.subscribe(updateColor);
      return () => ColorProperties.unsubscribe(updateColor);
    }, []);

  const handleChangeText = (value) => {
    onChangeText(value);

    AddressApiToRegistration(value)
      .then((response) => {
        setAddressInfo(response);
      })
      .catch((error) => {
        console.error("Error:", error); // Обработка ошибок, если что-то пошло не так при запросе к API
      });
    setIsListOpen(false);
  };

  const renderAddressItems = () => {
    return addressInfo.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleChangeText(item, "address")}
      >
        <Text style={[SimpleElementsStyle.textInDropdown, {color}, {borderColor}]}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <View style={page === "MyAccount" ? SimpleElementsStyle.myAccountBoxAddress : SimpleElementsStyle.authTextElementBoxAddress}>
        <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={[
            [SimpleElementsStyle.authTextInputElement, {borderColor}],
            error === true ? SimpleElementsStyle.errorTextInput : null,
            {color},
            {backgroundColor},
            
          ]}
          onChangeText={(text) => {
            handleChangeText(text, "address");
            setIsListOpen(true);
          }}
          placeholderTextColor={color}
          value={value}
          onFocus={() => setIsListOpen(true)}
        />
      </View>
      {isListOpen && addressInfo.length > 0 && (
        <View style={
          page === "MyAccount" ? [SimpleElementsStyle.dropdownMyAccount, {backgroundColor}, {borderColor}] : [SimpleElementsStyle.dropdown, {backgroundColor}, {borderColor}]
          
        }>{renderAddressItems()}</View>
      )}
    </>
  );
}
