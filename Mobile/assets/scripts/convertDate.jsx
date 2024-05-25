export const convertDate = (dateString) => {
    const date = new Date(dateString);
  
    // Определяем часовой пояс клиента
    const offsetInMinutes = date.getTimezoneOffset();
  
    // Вычисляем смещение часового пояса клиента в миллисекундах
    const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
  
    // Прибавляем смещение часового пояса к дате
    const convertedDate = new Date(date.getTime() - offsetInMilliseconds);
  
    // Получаем компоненты даты и времени
    const day = String(convertedDate.getDate()).padStart(2, '0');
    const month = String(convertedDate.getMonth() + 1).padStart(2, '0');
    const year = convertedDate.getFullYear();
    const hours = String(convertedDate.getHours()).padStart(2, '0');
    const minutes = String(convertedDate.getMinutes()).padStart(2, '0');
  
    // Формируем строку с датой, временем и часовым поясом
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  
    return formattedDate;
  };