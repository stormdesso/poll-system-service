export default function AddressApiToRegistration(address) {
    //Данные для API адресов
    let url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let token = "2beef888784bece34831c06914291396c175d299";

    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "authorization": "Token " + token
        },
        body: JSON.stringify({query: address, count: 10})
    }
    
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then(result => {
                if (result && result.suggestions && Array.isArray(result.suggestions)) {
                    const response = result.suggestions.map(suggestion => suggestion.value);
                    resolve(response); // Разрешаем обещание с заполненным массивом значений
                } else {
                    console.error('Invalid data format received from API');
                    resolve([]); // Разрешаем обещание с пустым массивом в случае некорректных данных
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error); // Отклоняем обещание в случае ошибки запроса
            });
    });

}