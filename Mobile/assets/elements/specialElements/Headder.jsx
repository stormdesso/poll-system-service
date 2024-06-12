import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import {SearchInput} from "../simpleElements/SearchInput"
import {ButtonWithDropDownList} from "../simpleElements/ButtonWithDropDownList"
import UserSettingsModal from "../specialElements/UserSettingsModal"

import {SortedType} from "../../Data/SortedType"
import {SearchProp} from "../../Data/SearchProp"
import sorted from "../../Img/Icon/sorted.png"
import {HeadderStyle} from "../styleSpecialElements/HeadderStyle"

import { ColorProperties } from "../../Data/ColorProperties";

export const Headder = ({navigation}) => {
    const [backgroundColor, setBackgroundColor] = useState(ColorProperties.backgroundColor);

    useEffect(() => {
        const updateColor = () => {
          setBackgroundColor(ColorProperties.backgroundColor);
        };
    
        ColorProperties.subscribe(updateColor);
        return () => ColorProperties.unsubscribe(updateColor);
      }, []);
      
    const handleSortedTypeChange = (value) => {
        SearchProp.setSortedType(value);
    };

    return (
        <View style={[HeadderStyle.Headder, {backgroundColor}]}>
            <UserSettingsModal navigation={navigation} />
            <SearchInput />
            <ButtonWithDropDownList 
                data = {SortedType} 
                icon={sorted}
                onClick={handleSortedTypeChange}
            />
        </View>
    )
}