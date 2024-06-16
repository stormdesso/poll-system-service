export const transformObjectToRegistration = (input) => {
    let address =[{}]
    let birth = ""

    if (typeof input.addressInfos === 'string') {
      const addressParts = input.addressInfos.split(', ');
  
      const city = addressParts[0].replace("г ", "");
      const street = addressParts[1].replace("ул ", "");
      const houseNumber = addressParts[2].replace("д ", "");
      const apartmentNumber = addressParts[3].replace("кв ", "");
      address = [{
        city: city,
        street: street,
        houseNumber: houseNumber,
        apartmentNumber: parseInt(apartmentNumber, 10)
      }]

      const [day, month, year] = input.birthdate.split('.');
      const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      birth = date.toISOString();
    }
    else {
      address = input.addressInfos
      birth = input.birthdate
    }

    return {
      fullName: input.fullName,
      birthdate: birth,
      login: input.login,
      phoneNumber: input.phoneNumber.replace(/\D/g, ''),
      email: input.email,
      addressInfos: address,
      roles: [
        "user"  // Укажите роль, которая необходима
      ],
      blocked: true  // Установите значение по умолчанию или измените по необходимости
    };
  };