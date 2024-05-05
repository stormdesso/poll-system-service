export default function validationDataInAuth(login, password) {
  let errorStatus = {
    login: false,
    password: false,
  };
  let errorText = "true";

  if (login.length <= 0 && password.length <= 0) {
    errorStatus.login = true;
    errorStatus.password = true;
    errorText = "Логин и пароль не заполнены";
  } else if (login.length <= 0) {
    errorStatus.login = true;
    errorText = "Логин не заполнен";
  } else if (password.length <= 0) {
    errorStatus.password = true;
    errorText = "Пароль не заполнен";
  }
  return [errorStatus, errorText];
}
