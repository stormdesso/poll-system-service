import * as SecureStore from 'expo-secure-store';

export default function DeleteAddressAPI(data) {
    //Данные для API адресов
    return new Promise((resolve, reject) => {
        
        SecureStore.getItemAsync('Token')
            .then(token => {
                let url = `http://192.168.0.159:8080/api/v1/relocation/address/delet`;
                let options = {
                    method: "POST",
                    headers: {
                        "Connection": "keep-alive",
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": token,
                    },
                    body: JSON.stringify(data),
                };
                fetch(url, options)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch update poll1");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        resolve(true);
                    })
            })
            .catch(error => {
                console.error("Ошибка получения токена", error);
                reject(error);
            });
    });
}