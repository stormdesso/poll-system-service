import * as SecureStore from 'expo-secure-store';

export default function GetHistoryMessage(pollId, region, city) { 
    return new Promise((resolve, reject) => {
        SecureStore.getItemAsync('Token')
            .then(token => {
                if (!token) {
                    throw new Error("Token not found");
                }

                let url = `http://192.168.0.159:8080/api/v1/poll/chat/messages?pollId=${pollId}&timeZone=${region}%2F${city}`;
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
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.error("Error fetching messages history:", error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error("Ошибка получения истории сообщений:", error);
                reject(error);
            });
    });
}
