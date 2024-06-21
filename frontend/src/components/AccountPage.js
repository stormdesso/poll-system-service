import React, { useEffect, useState } from 'react';
import './styles.css';
import { getDate } from '../utils/dateConverter';
import { errorValidators } from '../utils/validation';
import { toISOString } from '../utils/dateConverter';

function AccountPage() {
  const token = localStorage.getItem('token')
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    phoneNumber: '',
  });
  const [addressInfo, setAddressInfo] = useState({
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
  })
  const [user, setUser] = useState(null)
  const [isDataEdit, setIsDataEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [fullNameError, setFullnameError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [cityError, setCityError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [houseError, setHouseError] = useState("");
  const [apartmentError, setApartmentError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/user/account/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*",
            Authorization: `Bearer ${token}`
          },
        })
        if (response.ok) {
          const user = await response.json();
          setUser(user);
          setUserData({
            fullName: user.fullName || '',
            email: user.email || '',
            birthDate: getDate(user.birthdate) || '',
            phoneNumber: getPhoneNumber(user.phoneNumber) || '',
          });
          localStorage.setItem('fio', user.fullName);
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [token])

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo({
      ...addressInfo,
      [name]: value
    });
  };

  const getPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const formatted = cleaned.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
    return formatted;
  }

  const handleDataEditButton = () => {
    setIsDataEdit(true);
  }

  const handlePasswordEditButton = () => {
    setIsPasswordEdit(true);
  }

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    let phoneNumber = value.replace(/\D/g, "");

    let formattedPhoneNumber = "";

    if (phoneNumber.length === 0) {
      return;
    } else {
      if (["7", "8", "9"].indexOf(phoneNumber[0]) > -1) {
        formattedPhoneNumber = "+7";
        if (phoneNumber[0] === "9") {
          formattedPhoneNumber += " (" + phoneNumber;
        }
        if (phoneNumber.length > 1) {
          formattedPhoneNumber += " (" + phoneNumber.substring(1, 4);
        }

        if (phoneNumber.length >= 5) {
          formattedPhoneNumber += ") " + phoneNumber.substring(4, 7);
        }

        if (phoneNumber.length >= 8) {
          formattedPhoneNumber += "-" + phoneNumber.substring(7, 9);
        }

        if (phoneNumber.length >= 10) {
          formattedPhoneNumber += "-" + phoneNumber.substring(9, 11);
        }
      } else {
        formattedPhoneNumber = "+" + phoneNumber[0];
        if (phoneNumber.length > 1) {
          formattedPhoneNumber += " (" + phoneNumber.substring(1, 4);
        }

        if (phoneNumber.length >= 5) {
          formattedPhoneNumber += ") " + phoneNumber.substring(4, 7);
        }

        if (phoneNumber.length >= 8) {
          formattedPhoneNumber += "-" + phoneNumber.substring(7, 9);
        }

        if (phoneNumber.length >= 10) {
          formattedPhoneNumber += "-" + phoneNumber.substring(9, 11);
        }
      }
    }
    setUserData({
      ...userData,
      phoneNumber: formattedPhoneNumber
    });
  }

  const handleApartmentNumber = (e) => {
    let value = e.target.value;
    let number;
    number = parseInt(value, 10);
    if (isNaN(number) || number <= 0) {
      number = 1;
    }
    setAddressInfo({
      ...addressInfo,
      apartmentNumber: number
    });
  }

  const handlePasswordChange = (e) => {
    let value = e.target.value;
    setPassword(value);
  }

  const handleConfirmPasswordChange = (e) => {
    let value = e.target.value;
    setConfirmPassword(value);
  }

  const handleDataSaveButton = async (e) => {
    e.preventDefault();
    setFullnameError("");
    setBirthdateError("");
    setPhoneNumberError("");
    setEmailError("");

    let ok = true;

    const ename = errorValidators.empty(userData.fullName);
    if (ename) {
      setFullnameError(ename);
      ok = false;
    }

    let ebirthdate = errorValidators.empty(userData.birthDate);
    if (ebirthdate) {
      setBirthdateError(ebirthdate);
      ok = false;
    } else {
      ebirthdate = errorValidators.birthday(userData.birthDate);
      if (ebirthdate) {
        setBirthdateError(ebirthdate);
        ok = false;
      }
    }

    let ephoneNumber = errorValidators.empty(userData.phoneNumber);
    if (ephoneNumber) {
      setPhoneNumberError(ephoneNumber);
      ok = false;
    } else {
      ephoneNumber = errorValidators.phoneNumber(userData.phoneNumber);
      if (ephoneNumber) {
        setPhoneNumberError(ephoneNumber);
        ok = false;
      }
    }

    let eemail = errorValidators.empty(userData.email);
    if (eemail) {
      setEmailError(eemail);
      ok = false;
    } else {
      eemail = errorValidators.email(userData.email);
      if(eemail) {
        setEmailError(eemail)
        ok = false;
      }
    }

    if (ok) {
      try {
        const request = {
          id: user.id,
          fullName: userData.fullName,
          birthdate: toISOString(userData.birthDate),
          login: user.login,
          email: userData.email,
          phoneNumber: userData.phoneNumber.replace(/\s/g, '').replace(/[-()]/g, '').replace(/^\+/, ''),
        }
        console.log(JSON.stringify(request))
        const response = await fetch(`http://localhost:8080/api/v1/user/account/edit/me`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(request)
        })
        if (response.ok) {
          setIsDataEdit(false);
          setFullnameError("");
          setBirthdateError("");
          setPhoneNumberError("");
          setEmailError("");
          console.log("Данные успешно изменены")
        } else {
          console.error(response.error);
        }
      } catch (e) {
        console.error(e);
      }
    }  
  }

  const handlePasswordSaveButton = async(e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");

    let ok = true;

    let epassword = errorValidators.empty(password);
    if (epassword) {
      setPasswordError(epassword);
      ok = false;
    } else {
      epassword = errorValidators.password(password);
      if (epassword) {
        setPasswordError(epassword);
        ok = false;
      }
    }

    let erepeat = errorValidators.empty(confirmPassword);
    if (erepeat) {
      setConfirmPasswordError(erepeat);
      ok = false;
    } else {
      erepeat = errorValidators.passwordEqual(password, confirmPassword);
      if (erepeat) {
        setConfirmPasswordError(erepeat);
        ok = false;
      }
    }

    try {
      const request = {
        id: user.id,
        fullName: user.fullName,
        birthdate: user.birthdate,
        login: user.login,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
      const response = await fetch(`http://localhost:8080/api/v1/user/account/edit/me?password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "*/*",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(request)
      })
      if (response.ok) {
        setIsPasswordEdit(false);
        console.log("Пароль успешно изменен")
        setPasswordError("");
        setConfirmPasswordError("");
      } else {
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleAddAddressButton = async (e) => {
    e.preventDefault();
    setStreetError("");
    setCityError("");
    setHouseError("");
    setApartmentError("");
    let ok = true;

    const ecity = errorValidators.empty(addressInfo.city);
    if (ecity) {
      setCityError(ecity);
      ok = false;
    }

    const estreet = errorValidators.empty(addressInfo.street);
    if (estreet) {
      setStreetError(estreet);
      ok = false;
    }

    const ehouse = errorValidators.empty(addressInfo.houseNumber);
    if (ehouse) {
      setHouseError(ehouse);
      ok = false;
    }

    const eapartment = errorValidators.empty(addressInfo.apartmentNumber);
    console.log(eapartment);
    if (eapartment) {
      setApartmentError(eapartment);
      ok = false;
    }

    if (ok) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/relocation/address/add', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(addressInfo)
        })
        if (response.ok) {
          console.log("победа");
        } else {
          console.log(response.error);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="account-page">
      <div className="content">
        <div className="section">
          <h2>Мой аккаунт:</h2>
          <div className="form-field">
            <label>ФИО:</label>
            <input 
              type="text" 
              name='fullName'
              value={userData.fullName}
              onChange={handleUserInputChange}
              disabled={!isDataEdit}
              className={fullNameError ? 'input-error' : ''}
            />
            <div className='error'>{fullNameError}</div>
          </div>
          <div className="form-field">
            <label>Дата рождения:</label>
            <input 
              type="date"
              name='birthDate'
              value={userData.birthDate}
              onChange={handleUserInputChange}
              disabled={!isDataEdit}
              className={birthdateError ? 'input-error' : ''}
            />
            <div className='error'>{birthdateError}</div>
          </div>
          <div className="form-field">
            <label>Электронная почта:</label>
            <input 
              type="email" 
              name="email"
              value={userData.email}
              onChange={handleUserInputChange}
              disabled={!isDataEdit}
              className={emailError ? 'input-error' : ''}
            />
            <div className='error'>{emailError}</div>
          </div>
          <div className="form-field">
            <label>Номер телефона:</label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={!isDataEdit}
              className={phoneNumberError ? 'input-error' : ''}
            />
            <div className='error'>{phoneNumberError}</div>
          </div>
          {isDataEdit ? (
            <button className="submit-button" onClick={handleDataSaveButton}>Сохранить</button>
          ) : (
            <button className="submit-button" onClick={handleDataEditButton}>Редактировать</button>
          )}
          <button className="submit-button" style={{marginLeft: "10px"}}>Удалить аккаунт</button>
        </div>
        <div className="section" style={{marginTop: '20px', marginBottom: '20px'}}>
          <h2>Изменить пароль:</h2>
          <div className="form-field">
            <label>Новый пароль:</label>
            <input 
              type="password" 
              disabled={!isPasswordEdit}
              value={password}
              onChange={handlePasswordChange}
              className={passwordError ? 'input-error' : ''}
            />
            <div className='error'>{passwordError}</div>
          </div>
          <div className="form-field">
            <label>Подтвердите пароль:</label>
            <input 
              type="password" 
              disabled={!isPasswordEdit}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={confirmPasswordError ? 'input-error' : ''}
            />
            <div className='error'>{confirmPasswordError}</div>
          </div>
          {isPasswordEdit ? (
            <button className="submit-button" onClick={handlePasswordSaveButton}>Сохранить</button>
          ) : (
            <button className="submit-button" onClick={handlePasswordEditButton}>Редактировать</button>
          )}
        </div>
      </div>
      
      <div className="address-section">
        <div>
          <h2>Мои адреса:</h2>
          <p>
            Данная форма заполняется в случае изменения места жительства. 
            После изменения данных ваш аккаунт будет деактивирован до его активации управляющим домом. 
            Для ускорения процесса можете обратиться к управляющему.
          </p>
          <form onSubmit={handleAddAddressButton}>
          <label>
            Город:
            <input 
              type="text" 
              name="city"
              value={addressInfo.city}
              onChange={handleAddressInputChange}
              className={cityError ? "input-error" : ''}
            />
            <div className='error-container'>
              {cityError && <div>{cityError}</div>}
            </div>
          </label>
          <label>
            Название улицы:
            <input 
              type="text" 
              name="street"
              value={addressInfo.street}
              onChange={handleAddressInputChange}
              className={streetError ? "input-error" : ''}
            />
            <div className='error-container'>
              {streetError && <div>{streetError}</div>}
            </div>
          </label>
          <label>
            Номер дома:
            <input 
              type="text"
              name="houseNumber"
              value={addressInfo.houseNumber}
              onChange={handleAddressInputChange}
              className={houseError ? "input-error" : ''} 
            />
            <div className='error-container'>
              {houseError && <div>{houseError}</div>}
            </div>
          </label>
          <label>
            Номер квартиры:
            <input 
              type="number"
              name="apartmentNumber"
              value={addressInfo.apartmentNumber}
              onChange={handleApartmentNumber} 
              min={1}
              className={apartmentError ? "input-error" : ''}
            />
            <div className='error-container'>
              {apartmentError && <div>{apartmentError}</div>}
            </div>
          </label>
          <button type="submit" className='submit-button'>Добавить адрес</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
