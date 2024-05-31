import React from "react";
import { View, TextInput } from "react-native";
import {HeadderStyle} from "../HeadderStyle"

export const SearchInput = () => {
    return (
        <View style = {HeadderStyle.Search}>
            <TextInput 
                placeholder="Поиск..."
            />
        </View>
    )
}