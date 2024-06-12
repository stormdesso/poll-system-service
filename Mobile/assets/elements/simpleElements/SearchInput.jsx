import React, { useState, useEffect } from 'react';
import { View, TextInput } from "react-native";
import {HeadderStyle} from "../styleSpecialElements/HeadderStyle"

import {SearchProp} from "../../Data/SearchProp"
import { ColorProperties } from '../../Data/ColorProperties';

export const SearchInput = () => {

    const [text, setText] = useState('');

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
 
    const handleTextChange = (inputText) => {
        setText(inputText);
        SearchProp.setSearchText(inputText)
      };


    return (
        <View style = {[HeadderStyle.Search, {backgroundColor}, {color}, {borderColor}]}>
            <TextInput 
                placeholder="Поиск..."
                onChangeText={handleTextChange}
                value={text}
                placeholderTextColor={color}
            />
        </View>
    )
}