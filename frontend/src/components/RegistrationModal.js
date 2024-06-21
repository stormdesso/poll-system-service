import React, { useState } from 'react';
import './reg.css';
import { errorValidators } from '../utils/validation';
import { toISOString } from '../utils/dateConverter';



function RegistrationModal({ onClose, onRegister }) {
  const [fullNameError, setFullnameError] = useState("")
  const [birthdateError, setBirthdateError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [loginError, setLoginError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [formData, setFormData] = useState({
    fullName: '',
    birthdate: '',
    address: '',
    login: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: ''
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
    setFormData({
      ...formData,
      phoneNumber: formattedPhoneNumber
    });
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    setFullnameError("")
    setBirthdateError("")
    setAddressError("")
    setLoginError("")
    setPasswordError("")
    setConfirmPasswordError("")
    setPhoneNumberError("")
    setEmailError("")
    
    let ok = true;

    const ename = errorValidators.empty(formData.fullName.trim());
    if (ename) {
      setFullnameError(ename);
      ok = false;
    }

    let ebirthdate = errorValidators.empty(formData.birthdate);
    if (ebirthdate) {
      setBirthdateError(ebirthdate);
      ok = false;
    } else {
      ebirthdate = errorValidators.birthday(formData.birthdate);
      if (ebirthdate) {
        setBirthdateError(ebirthdate);
        ok = false;
      }
    }

    let eaddress = errorValidators.empty(formData.address.trim());
    if (eaddress) {
      setAddressError(eaddress);
      ok = false;
    } else {
      eaddress = errorValidators.address(formData.address);
      if (eaddress) {
        setAddressError(eaddress);
        ok = false;
      }
    }

    let epassword = errorValidators.empty(formData.password);
    if (epassword) {
      setPasswordError(epassword);
      ok = false;
    } else {
      epassword = errorValidators.password(formData.password);
      if (epassword) {
        setPasswordError(epassword);
        ok = false;
      }
    }

    let erepeat = errorValidators.empty(formData.confirmPassword);
    if (erepeat) {
      setConfirmPasswordError(erepeat);
      ok = false;
    } else {
      erepeat = errorValidators.passwordEqual(formData.password, formData.confirmPassword);
      if (erepeat) {
        setConfirmPasswordError(erepeat);
        ok = false;
      }
    }

    let ephoneNumber = errorValidators.empty(formData.phoneNumber);
    if (ephoneNumber) {
      setPhoneNumberError(ephoneNumber);
      ok = false;
    } else {
      ephoneNumber = errorValidators.phoneNumber(formData.phoneNumber);
      if (ephoneNumber) {
        setPhoneNumberError(ephoneNumber);
        ok = false;
      }
    }

    let eemail = errorValidators.empty(formData.email.trim());
    if (eemail) {
      setEmailError(eemail);
      ok = false;
    } else {
      eemail = errorValidators.email(formData.email);
      if(eemail) {
        setEmailError(eemail)
        ok = false;
      }
    }

    const elogin = errorValidators.empty(formData.login.trim());
    if (elogin) {
      setLoginError(elogin);
      ok = false;
    }

    if (ok) {
      const addressParts = formData.address.split(',');
      const addressInfo = {
        city: addressParts[0].trim().split(' ')[1],
        street: addressParts[1].trim().split(' ')[1],
        houseNumber: addressParts[2].trim().split(' ')[1],
        apartmentNumber: addressParts[3].trim().split(' ')[1]
      }

      const request = {
        fullName: formData.fullName,
        birthdate: toISOString(formData.birthdate),
        login: formData.login,
        phoneNumber: formData.phoneNumber.replace(/\s/g, '').replace(/[-()]/g, '').replace(/^\+/, ''),
        email: formData.email,
        addressInfos: [addressInfo],
        roles: ['user'],
      }

      const param = new URLSearchParams();
      param.append('password', formData.password);
      const url = `http://localhost:8080/api/v1/auth/signup?${param.toString()}`
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*",
          },
          body: JSON.stringify(request)
        });
  
        if (response.ok) {
          console.log('Пользователь зарегистрирован')
          onClose();
        } else if (response.status === 404) {
          const error = await response.text();
          setAddressError(error);
        }
      } catch (error) {
        console.log(error);
      }
    } 
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Регистрация</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              ФИО:
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                className={fullNameError ? 'input-error' : ''}
              />
              <div className='error'>{fullNameError}</div>
            </label>
            
            <label>
              Дата рождения:
              <input 
                type="date" 
                name="birthdate" 
                value={formData.birthdate} 
                onChange={handleChange}
                className={birthdateError ? 'input-error' : ''}
              />
              <div className='error'> {birthdateError}</div>
            </label>
            <label>
              Адрес проживания:
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                className={addressError ? 'input-error' : ''}
              />
              <div className='error'> {addressError}</div>
            </label>
            <label>
              Логин:
              <input 
                type="text" 
                name="login" 
                value={formData.login} 
                onChange={handleChange} 
                className={loginError ? 'input-error' : ''}
              />
              <div className='error'> {loginError}</div>
            </label>
            <label>
              Пароль:
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className={passwordError ? 'input-error' : ''}
              />
              <div className='error'> {passwordError}</div>
            </label>
            <label>
              Повторите пароль:
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className={confirmPasswordError ? 'input-error' : ''}
              />
              <div className='error'> {confirmPasswordError}</div>
            </label>
            <label>
              Номер телефона:
              <input 
                type="tel" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handlePhoneNumberChange} 
                className={phoneNumberError ? 'input-error' : ''}
              />
              <div className='error'> {phoneNumberError}</div>
            </label>
            <label>
              Электронная почта:
              <input 
                type="text" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className={emailError ? 'input-error' : ''} 
              />
              <div className='error'> {emailError}</div>
            </label>
            <div className="button-container">
              <button type="submit" className="submit-button">Зарегистрироваться</button>
              <button type="button" className="back-button" onClick={onClose}>Назад</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;
