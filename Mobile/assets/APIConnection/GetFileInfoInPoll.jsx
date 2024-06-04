import * as SecureStore from 'expo-secure-store';

export default function GetFileInfoInPoll(pollId) { 
    return new Promise((resolve, reject) => {
        
        SecureStore.getItemAsync('Token')
            .then(token => {
                let url = `http://192.168.0.159:8080/api/v1/file?pollId=${pollId}`;
                let options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": token
                    }
                };

                fetch(url, options)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch file info");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching file info:", error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error("Ошибка получения информации по файлам", error);
                reject(error);
            });
    });
}