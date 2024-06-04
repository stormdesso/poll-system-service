import { useState, useEffect } from "react";
import GetFileInfoInPoll from "../APIConnection/GetFileInfoInPoll";

export default function GetFileInfo (pollId) {
    const [imageFilesArray, setImageFilesArray] = useState("");
    const [otherFilesArray, setOtherFilesArray] = useState("");

    function isImage(filename) {
        const imageExtensions = /\.(jpeg|jpg|png|gif|bmp|tiff|tif|svg|jfif)$/i; // регулярное выражение для расширений изображений
        return imageExtensions.test(filename);
    }

    useEffect(() => {
        GetFileInfoInPoll(pollId)
            .then(fileInfoArray => {
                let imageFiles = "";
                let otherFiles = "";
                fileInfoArray.forEach(fileInfo => {
                    // Проверяем, является ли файл изображением
                    if (isImage(fileInfo.originalName)) {
                        imageFiles += `&ids=${fileInfo.id}`;
                    } else {
                        otherFiles += `&ids=${fileInfo.id}`;
                    }
                });
                setImageFilesArray(imageFiles);
                setOtherFilesArray(otherFiles);
            })
            .catch(error => {
                console.error('Error fetching file info:', error);
            });
    }, [pollId]);

    return { imageFilesArray, otherFilesArray };
}