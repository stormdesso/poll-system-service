import * as SecureStore from "expo-secure-store";

export default function GetToken(login, password) {
  // Данные для API адресов
  let url = "http://localhost:8080/api/v1/auth/signin";
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

  return fetch(url, options)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }
      return response.json();
    })
    .then(responseData => {
      const token = responseData.Value;

      // Сохранение токена в SecureStore
      return SecureStore.setItemAsync("token", token)
        .then(() => {
          console.log(token);
          return { success: true }; // Возвращаем успешный результат
        });
    })
    .catch(error => {
      console.error("Error fetching token:", error);
      return { success: false, error: error.message }; // Возвращаем ошибку
    });
}