import React, { useState, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from "react-native";

import {HeadderStyle} from "../styleSpecialElements/HeadderStyle"

import { ColorProperties } from '../../Data/ColorProperties';
 
export const ButtonWithDropDownList = ({data, icon, onClick}) => {
    const [getIsShowDropDown, setIsShowDropDown] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);
    const [color, setTextColor] = useState(ColorProperties.textColor);
    const renderDropDownItems = () => {
        return Object.keys(data).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
                setIsShowDropDown(false);
                onClick(data[item])
            }}
          >
            <Text style={[HeadderStyle.TextInDropdown, {color}]}>{item}</Text>
          </TouchableOpacity>
        ));
      };

      useEffect(() => {
          const updateColor = () => {
            setBackgroundColor(ColorProperties.backgroundColor);
            setTextColor(ColorProperties.textColor)
          };
      
          ColorProperties.subscribe(updateColor);
          return () => ColorProperties.unsubscribe(updateColor);
      }, []);

    return(
        <>
            <View>
                <TouchableOpacity style = {HeadderStyle.SortedButton} onPress={() => setIsShowDropDown(true)}>
                    <Image 
                      source={icon} 
                      style = {HeadderStyle.Image}
                      />
                </TouchableOpacity>
            </View>
            {getIsShowDropDown && (
                <View style={[HeadderStyle.Dropdown, {backgroundColor}]}>{renderDropDownItems()}</View>
            )}
        </>
        
    )
}