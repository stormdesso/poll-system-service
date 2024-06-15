export default function validationPasswordInRegistration(data) {
  let errorStatus = {
    name: false,
    dateBirth: false,
    address: false,
    login: false,
    password: false,
    repeatPassword: false,
    phoneNumber: false,
    email: false,
  };
  let errorText = "";

  const changeErrorStatus = (key, isError) => {
    errorStatus[key] = isError;
  };

  let error = false;
  for (const [key, value] of Object.entries(data)) {
    if (value === "") {
      error = true;
      changeErrorStatus(key, true);
    } else {
      changeErrorStatus(key, false);
    }
  }

  if (error) {
    errorText = "Заполнены не все обязательные поля";
    return [errorStatus, errorText];
  } else {
    if (data.password !== data.repeatPassword) {
      error = true;
      changeErrorStatus("password", true);
      changeErrorStatus("repeatPassword", true);
      errorText = "Пароли не совпадают";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}/.test(
        data.password
      )
    ) {
      error = true;
      changeErrorStatus("password", true);
      changeErrorStatus("repeatPassword", true);
      errorText =
        "Пароль должен содержать как минимум 12 символов, включая латинские буквы верхнего и нижнего регистров, цифры, и спецсимволы";
    }
  }

  if (error) {
    return [errorStatus, errorText];
  } else {
    if (data.phoneNumber.length !== 18) {
      changeErrorStatus("phoneNumber", true);
      error = true;
      errorText = "Номер телефона должен содержать 11 символов не включая +";
    } else {
      changeErrorStatus("phoneNumber", false);
    }
  }

  if (error) {
    return [errorStatus, errorText];
  } else {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      error = true;
      changeErrorStatus("email", true);
      errorText = "Электронная почта заполнена неправильно";
    } else {
      changeErrorStatus("email", false);
      errorText = "";
    }
  }

  if (error) {
    return [errorStatus, errorText];
  } else {
    if (!/г\s.+ул\s.+д\s.+кв\s.+/.test(data.addressInfos)) {
      error = true;
      changeErrorStatus("address", true);
      errorText =
        "Адрес заполнен неправильно, он должен содержать город, улицу и номер дома";
    } else {
      changeErrorStatus("address", false);
      errorText = "";
    }
  }
  return [errorStatus, errorText];
}
