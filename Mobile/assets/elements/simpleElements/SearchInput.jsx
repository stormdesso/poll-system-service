import React, { useState } from 'react';
import { View, TextInput } from "react-native";
import {HeadderStyle} from "../HeadderStyle"

import {SearchProp} from "../../Data/SearchProp"

export const SearchInput = () => {

    const [text, setText] = useState('');

    const handleTextChange = (inputText) => {
        setText(inputText);
        SearchProp.setSearchText(inputText)
      };


    return (
        <View style = {HeadderStyle.Search}>
            <TextInput 
                placeholder="Поиск..."
                onChangeText={handleTextChange}
                value={text}
            />
        </View>
    )
}