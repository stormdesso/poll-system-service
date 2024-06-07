import * as SecureStore from 'expo-secure-store';

import { SearchProp } from '../Data/SearchProp';

export default function GetMyCreatePollList(currentPage) {
    //Данные для API адресов
    return new Promise((resolve, reject) => {
        
        Promise.all([
            SecureStore.getItemAsync('Token'),
            SecureStore.getItemAsync('Id') // Замените 'OtherKey' на имя второго ключа, который вы хотите получить
          ])
            .then(([token, id]) => {
                let requestBody = [{
                    "key": "status",
                    "value": "proposed"
                }];

                let url = `http://192.168.0.159:8080/api/v1/poll/filtered_list?sort=${SearchProp.sortedType}&limit=6&page=${currentPage}`;
                let options = {
                    method: "POST",
                    headers: {
                        "Connection": "keep-alive",
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": token,
                    },
                    body: JSON.stringify(requestBody),
                };

                fetch(url, options)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch poll list");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(data);
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