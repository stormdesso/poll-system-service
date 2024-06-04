import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Linking } from 'react-native';

import {GetFileIcon} from "../../Data/GetFileIcon"
import GetFile from "../../APIConnection/GetFile";

import { ShortPollCardStyle } from "../styleSpecialElements/ShortPollCardStyle";

export const FileListInPollInfo = ({ pollId, selectFileId }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Вызов GetFile внутри useEffect для предотвращения бесконечного цикла рендеринга
        GetFile(pollId, selectFileId)
            .then(file => {
                setFiles(file);
            })
            .catch(error => {
                console.error('Error fetching file info:', error);
            });
    }, [pollId, selectFileId]); // Зависимости: вызов происходит только при изменении pollId или selectFileId

    return (
        <View>
            <Text>Список файлов:</Text>
            <FlatList
                data={files}
                renderItem={({ item }) => (
                <TouchableOpacity style={ShortPollCardStyle.FileList}>
                    <Text style={ShortPollCardStyle.FileImageBlock}>
                        <Image source={GetFileIcon(item.type)} style={ShortPollCardStyle.FileImage}></Image>
                    </Text>
                    <Text>
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
