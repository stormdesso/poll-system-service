import * as SecureStore from 'expo-secure-store';

export default function GetPollList() {
    //Данные для API адресов

    return new Promise((resolve, reject) => {
        SecureStore.getItemAsync('Token')
            .then(token => {
                let url = "http://192.168.0.159:8080/api/v1/poll/filtered_list";

                let options = {
                    method: "GET",
                    headers: {
                        Connection: "keep-alive",
                        accept: "*/*",
                        authorization: token,
                    }
                };

                fetch(url, options)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch poll list");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data.items);
                    })
                    .catch((error) => {
                        console.error("Error fetching poll list:", error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error("Ошибка получения токена", error);
                reject(error);
            });
    });
}