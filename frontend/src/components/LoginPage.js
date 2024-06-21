import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './reg.css';
import RegistrationModal from './RegistrationModal';

function LoginPage({ onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    setIsLoginError(false);
    setIsPasswordError(false);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let ok = true;

    if (loginData.login.trim() === '') {
      setIsLoginError(true);
      setError("Заполнены не все обязательные поля");
      ok = false;
    }

    if (loginData.password === '') {
      setIsPasswordError(true);
      ok = false;
    }

    if (ok) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "*/*",
          },
          body: JSON.stringify(loginData)
        });

        if (response.ok) {
          const { token, role, id, fio } = await response.json();
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('id', id);
          localStorage.setItem('fio', fio);
          setError("");
          setIsLoginError(false);
          setIsPasswordError(false);
          onLogin();
          setIsAuthenticated(true);
        } else {
          setError('Неверные логин или пароль');
        }
      } catch (error) {
        console.error('Ошибка аутентификации:', error);
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/surveys" />;
  }

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Вход</h2>
        <form onSubmit={handleLogin}>
          <label>
            Логин:
            <input 
              type="text" 
              name="login" 
              value={loginData.login} 
              onChange={handleInputChange}
              className={isLoginError ? 'input-error' : ''}
            />
          </label>
          <label>
            Пароль:
            <input 
              type="password" 
              name="password" 
              value={loginData.password} 
              onChange={handleInputChange}
              className={isPasswordError ? 'input-error' : ''}
            />
          </label>
          <div className='error-container'>
            {error && <div className='error-text-input'>{error}</div>}
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">Войти</button>
            <button type="button" className="register-button" onClick={() => setShowModal(true)}>Зарегистрироваться</button>
          </div>
        </form>
      </div>
      {showModal && <RegistrationModal onClose={() => setShowModal(false)} onRegister={onLogin} />}
    </div>
  );
}

export default LoginPage;