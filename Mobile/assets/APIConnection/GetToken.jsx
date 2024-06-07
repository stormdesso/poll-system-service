import * as SecureStore from 'expo-secure-store';

export default async function GetToken(login, password) {
  // Данные для API адресов
  let url = "http://192.168.0.159:8080/api/v1/auth/signin";
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  };

  async function saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    const responseData = await response.json();
    console.log(responseData);

    const keyValue = "Bearer " + responseData.token;
    const tokenSaveResult = await saveToken('Token', keyValue);
    if (!tokenSaveResult.success) {
      throw new Error(`Error saving Token: ${tokenSaveResult.error}`);
    }

    const nameSaveResult = await saveToken('Name', responseData.fio);
    if (!nameSaveResult.success) {
      throw new Error(`Error saving Name: ${nameSaveResult.error}`);
    }

    const idSaveResult = await saveToken('Id', String(responseData.id));
    if (!idSaveResult.success) {
      throw new Error(`Error saving Id: ${idSaveResult.error}`);
    }

    const jsonValue = JSON.stringify(responseData.role);
    const roleSaveResult = await saveToken('Role', jsonValue);
    if (!roleSaveResult.success) {
      throw new Error(`Error saving Role: ${roleSaveResult.error}`);
    }

    return { success: true };
  } catch (error) {
    console.error(error.message);
    return { success: false, error: error.message };
  }
}