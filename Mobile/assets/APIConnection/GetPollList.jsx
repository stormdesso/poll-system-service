export default function GetPollList() {
    //Данные для API адресов
    let url =
      "http://localhost:8080/api/v1/poll/filtered_list";
  
    let options = {
      method: "GET",
      headers: {
        Connection: "keep-alive",
        accept: "*/*",
        authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNDk4NzQ1MywiZXhwIjoxNzE3NTc5NDUzfQ.ba8jrh9zwvggmivfA2zZS8ylbUWDhFWviGOsVMEKRvo",
      }
    };
  
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch poll list");
          }
          return response.json();
        })
        .then((data) => {
          resolve(data.items);
        })
        .catch((error) => {
          console.error("Error fetching poll list:", error);
          reject(error);
        });
    });
  }