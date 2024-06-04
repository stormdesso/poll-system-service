import * as SecureStore from 'expo-secure-store';

export default function GetFile(pollId, fileId) {

    return new Promise((resolve, reject) => {
        
        SecureStore.getItemAsync('Token')
            .then(token => {
                let url = `http://192.168.0.159:8080/api/v1/file/download_list?pollId=${pollId}${fileId}`;
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": token
                    }
                };

                fetch(url, options)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch download file");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching download file:", error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error("Ошибка скачивания файлов", error);
                reject(error);
            });
    });
}