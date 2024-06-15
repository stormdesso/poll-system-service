import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Linking } from 'react-native';

import {GetFileIcon} from "../../Data/GetFileIcon"
import GetFile from "../../APIConnection/GetFile";

import {FileListInPollInfoStyle} from "../styleSpecialElements/FileListInPollInfoStyle"
import { ColorProperties } from "../../Data/ColorProperties";

export const FileListInPollInfo = ({ pollId, selectFileId }) => {
    const [files, setFiles] = useState([]);
    const [color, setColor] = useState(ColorProperties.textColorInPollInfoCard);
  
    useEffect(() => {
      const updateColor = () => {
        setColor(ColorProperties.textColorInPollInfoCard);
      };
  
      ColorProperties.subscribe(updateColor);
      return () => ColorProperties.unsubscribe(updateColor);
    }, []);

    useEffect(() => {
        // Вызов GetFile внутри useEffect для предотвращения бесконечного цикла рендеринга
        GetFile(pollId, selectFileId)
            .then(file => {
                setFiles(file);
            })
            .catch(error => {
            });
    }, [pollId, selectFileId]); // Зависимости: вызов происходит только при изменении pollId или selectFileId

    return (
        <View>
            <FlatList
                data={files}
                renderItem={({ item }) => (
                <TouchableOpacity style={FileListInPollInfoStyle.FileList}>
                    <Text style={FileListInPollInfoStyle.FileImageBlock}>
                        <Image source={GetFileIcon(item.type)} style={FileListInPollInfoStyle.FileImage}></Image>
                    </Text>
                    <Text style={{color: color}}>
                    {
                        item.originalName
                    }
                    </Text>
                </TouchableOpacity>
                )}
            />
        </View>
    );
};
