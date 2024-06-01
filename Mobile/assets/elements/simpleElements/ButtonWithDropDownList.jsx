import React, { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import {HeadderStyle} from "../HeadderStyle"

export const ButtonWithDropDownList = ({data, icon, onClick}) => {
    const [getIsShowDropDown, setIsShowDropDown] = useState(false)

    const renderDropDownItems = () => {
        return data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
                setIsShowDropDown(false);
                item === 'От А до Я'? onClick('name') : onClick('-name')
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