export const transformObjectToRegistration = (input) => {
    const addressParts = input.addressInfos.split(', ');
  
    const city = addressParts[0].replace("г ", "");
    const street = addressParts[1].replace("ул ", "");
    const houseNumber = addressParts[2].replace("д ", "");
    const apartmentNumber = addressParts[3].replace("кв ", "");
    
    const [day, month, year] = input.birthdate.split('.');
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const isoString = date.toISOString();
  
    return {
      fullName: input.fullName,
      birthdate: isoString,
      login: input.login,
      phoneNumber: input.phoneNumber.replace(/\D/g, ''),
      email: input.email,
      addressInfos: [
        {
          city: city,
          street: street,
          houseNumber: houseNumber,
          apartmentNumber: parseInt(apartmentNumber, 10)
        }
      ],
      roles: [
        "user"  // Укажите роль, которая необходима
      ],
      blocked: true  // Установите значение по умолчанию или измените по необходимости
    };
  };