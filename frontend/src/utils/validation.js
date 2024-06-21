export const errorValidators = {
    empty: (v) => {
      if (v === '') {
        return 'Поле должно быть заполнено';
      }
      return null;
    },
    password: (v) => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}/.test(v)) {
        return 'Пароль должен содержать как минимум 12 символов, включая латинские буквы верхнего и нижнего регистров, цифры, и спецсимволы';
      }
      return null;
    },
    passwordEqual: (a, b) => {
      if (a !== b) {
        return 'Пароль не совпадает';
      }
      return null;
    },
    email: (v) => {
      if (!/\S+@\S+\.\S+/.test(v)) {
        return 'Электронная почта заполнена неправильно';
      }
      return null;
    },
    address: (v) => {
      if (!/г\s.+ул\s.+д\s.+кв\s.+/.test(v)) {
        return 'Адрес заполнен неправильно, он должен содержать город, улицу, номер дома и квартиры';
      }
      return null;
    },
    phoneNumber: (v) => {
      if (v.length !== 18) {
        return 'Номер телефона должен содержать 11 символов не включая +';
      }
      return null;
    },
    birthday: (v) => {
      const now = new Date();
      const birthdate = new Date(v);
      if (birthdate >= now) {
        return 'Дата рождения должна быть раньше текущей даты';
      }
      return null;
    }
  };