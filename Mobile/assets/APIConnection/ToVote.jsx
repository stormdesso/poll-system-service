import * as SecureStore from 'expo-secure-store';

import { SearchProp } from '../Data/SearchProp';

export default function ToVote(selectValue, pollValues, pollId) {
    let requestBody = [];

    const findObjectById = (id) => {
        return pollValues.find(item => item.id === id)
    };

    for (const item of selectValue){
        let poll = findObjectById(item)
        poll.votes += 1
        requestBody.push(poll)
    }    
    return new Promise((resolve, reject) => {
        
        SecureStore.getItemAsync('Token')
            .then(token => {
                let url = `http://192.168.0.159:8080/api/v1/poll/vote?pollId=${pollId}`;
                let options = {
                    method: "POST",
                    headers: {
                        "Connection": "keep-alive",
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "authorization": token
                    },
                    body: JSON.stringify(requestBody),
                };

                fetch(url, options)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch vote");
                        }
                        return response.json();
                    })
                    .then(() => {
                        resolve("Вы успешно проголосовали");
                    })
                    .catch((error) => {
                        console.error("Error fetching vote:", error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error("Ошибка получения токена", error);
                reject(error);
            });
    });
}