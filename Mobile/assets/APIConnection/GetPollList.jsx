import * as SecureStore from 'expo-secure-store';

import { SearchProp } from '../Data/SearchProp';

export default function GetPollList(currentPage) {
    //Данные для API адресов
    return new Promise((resolve, reject) => {
        
        SecureStore.getItemAsync('Token')
            .then(token => {
                let requestBody = SearchProp.filterPollPage;
                if (SearchProp.searchText !== "") {
                    requestBody.push({
                        "key": "name",
                        "value": SearchProp.searchText
                    });
                }

                let url = `http://192.168.0.159:8080/api/v1/poll/filtered_list?sort=${SearchProp.sortedType}&limit=10&page=${currentPage}`;
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
                        console.log(requestBody)
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