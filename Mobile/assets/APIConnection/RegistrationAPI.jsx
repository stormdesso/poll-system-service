import { SearchProp } from '../Data/SearchProp';

export default function RegistrationAPI(password, data) {
    return new Promise((resolve, reject) => {
      let url = `http://192.168.0.159:8080/api/v1/auth/signup?password=${password}`;
      let options = {
        method: "PUT",
        headers: {
          "Connection": "keep-alive",
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify(data)
      };
  
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch registration API");
          }
          resolve(true);
        })
        .catch((error) => {
          console.error("Error fetching registration API:", error);
          reject(error);
        });
    });
  }