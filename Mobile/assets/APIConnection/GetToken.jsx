import * as SecureStore from 'expo-secure-store';

export default function GetToken(login, password) {

  let keyName = ''
  let keyValue = ''
  

  // Данные для API адресов
  let url = "http://192.168.0.159:8080/api/v1/auth/signin";
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    body: JSON.stringify({
      "login": login,
      "password": password,
    }),
  };

  async function saveToken(key, value) {
    try 
    {
      await SecureStore.setItemAsync(key, value);
      return { success: true };
    } 
    catch (error) 
    {
      return { success: false, error: error.message };
    }
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }
      return response.json();
    })
    .then(responseData => {
      keyName = 'Token';
      keyValue = "Bearer " + responseData.token;
      return saveToken(keyName, keyValue);
    })
    .then(saveResult => {
      if (!saveResult.success) 
      {
        console.error('Error saving token:', saveResult.error);
      }
      return saveResult;
    })
    .catch(error => {
      return { success: false, error: error.message }; // Возвращаем ошибку
    });
}