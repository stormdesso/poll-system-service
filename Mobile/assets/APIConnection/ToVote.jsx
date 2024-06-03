import * as SecureStore from 'expo-secure-store';

import { SearchProp } from '../Data/SearchProp';

export default function ToVote(selectValue, pollValues, pollId) {
    console.log(selectValue)
    console.log(pollValues)

    return new Promise((resolve, reject) => {
        
        SecureStore.getItemAsync('Token')
            .then(token => {
                let url = `http://192.168.0.159:8080/api/v1/poll/vote`;
                let options = {
                    method: "POST",
                    headers: {
                        Connection: "keep-alive",
                        "Content-Type": "application/json",
                        accept: "*/*",
                        authorization: token,
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