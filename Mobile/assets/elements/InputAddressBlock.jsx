import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";

import { AuthPageStyle } from "../Style/AuthPageStyle";
import AddressApiToRegistration from "../APIConnection/addressApiToRegistration";

export default function InputAddressBlock({
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
        <Text style={{ padding: 10 }}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <>
      <View style={AuthPageStyle.authTextElementBoxAddress}>
        <Text style={AuthPageStyle.labelInputText}>{label}</Text>
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={[
            AuthPageStyle.authTextInputElement,
            error === true ? AuthPageStyle.errorTextInput : null,
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
        <View style={AuthPageStyle.dropdown}>{renderAddressItems()}</View>
      )}
    </>
  );
}
