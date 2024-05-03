export default function validationDataInAuth(login, password) {
  let errorStatus = {
    login: false,
    password: false,
  };
  let errorText = "";

  if (length(login) <= 0 && length(password) <= 0) {
    errorStatus.login = true;
    errorStatus.password = true;
    errorText = "Логин и пароль не заполнены";
  } else if (length(login) <= 0) {
    errorStatus.login = true;
    errorText = "Логин не заполнен";
  } else if (length(password) <= 0) {
    errorStatus.password = true;
    errorText = "Пароль не заполнен";
  }
  if (errorStatus.login === true || errorStatus.password === true) {
    return [errorStatus, errorText];
  }
}
