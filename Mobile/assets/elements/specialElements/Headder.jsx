import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import {SearchInput} from "../simpleElements/SearchInput"
import {ButtonWithDropDownList} from "../simpleElements/ButtonWithDropDownList"

import {SortedType} from "../../Data/SortedType"
import {SearchProp} from "../../Data/SearchProp"
import sorted from "../../Img/Icon/sorted.png"
import {HeadderStyle} from "../HeadderStyle"

export const Headder = () => {
    
    const handleSortedTypeChange = (value) => {
        SearchProp.setSortedType(value);
    };

    return (
        <View style={HeadderStyle.Headder}>
            <SearchInput />
            <ButtonWithDropDownList 
                data = {SortedType} 
                icon={sorted}
                onClick={handleSortedTypeChange}
            />
        </View>
    )
}