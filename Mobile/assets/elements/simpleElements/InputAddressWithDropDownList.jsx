import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";

import { SimpleElementsStyle } from "../styleSimleElements/SimpleElementsStyle";
import AddressApiToRegistration from "../../APIConnection/addressApiToRegistration";

export default function InputAddressWithDropDownList({
  label,
  value,
  error,
  onChangeText,
  keyboardType,
}) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [addressInfo, setAddressInfo] = useState([]);

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
        <Text style={SimpleElementsStyle.textInDropdown}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <View style={SimpleElementsStyle.authTextElementBoxAddress}>
        <Text style={SimpleElementsStyle.labelInputText}>{label}</Text>
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={[
            SimpleElementsStyle.authTextInputElement,
            error === true ? SimpleElementsStyle.errorTextInput : null,
          ]}
          onChangeText={(text) => {
            handleChangeText(text, "address");
            setIsListOpen(true);
          }}
          value={value}
          onFocus={() => setIsListOpen(true)}
        />
      </View>
      {isListOpen && addressInfo.length > 0 && (
        <View style={SimpleElementsStyle.dropdown}>{renderAddressItems()}</View>
      )}
    </>
  );
}
