import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import {HeadderStyle} from "../HeadderStyle"

import {SearchProp} from "../../Data/SearchProp"

export const ButtonWithDropDownList = ({data, icon}) => {
    const [getIsShowDropDown, setIsShowDropDown] = useState(false)

    const renderDropDownItems = () => {
        return data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
                setIsShowDropDown(false);
                item === "От А до Я"? SearchProp.sortedType = "asc" : SearchProp.sortedType = "desc"
            }}
          >
            <Text style={{ padding: 10 }}>{item}</Text>
          </TouchableOpacity>
        ));
      };

    return(
        <>
            <View>
                <TouchableOpacity style = {HeadderStyle.SortedButton} onPress={() => setIsShowDropDown(true)}>
                    <Image source={icon} />
                </TouchableOpacity>
            </View>
            {getIsShowDropDown && (
                <View style={HeadderStyle.Dropdown}>{renderDropDownItems()}</View>
            )}
        </>
        
    )
}