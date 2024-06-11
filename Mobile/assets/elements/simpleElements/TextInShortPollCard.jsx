import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { TextInShortPollCardStyle } from "../styleSimleElements/TextInShortPollCardStyle";

export default function TextInShortPollCard({
  text,
  img,
  data
}) {

  return (
    <View>
        <View style={TextInShortPollCardStyle.IconAndTextBox}>
            <Image 
                source={img}
                style={TextInShortPollCardStyle.Image}
            />
            <Text style={TextInShortPollCardStyle.Text}>{text} {data}</Text>
        </View>
    </View>
  );
}