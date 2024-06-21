import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Header({ onLogout }) {
  const fio = localStorage.getItem('fio');
  return (
    <header className="header">
      <div className="logo">
        <Link to="/surveys" className="logo-link">Мой Дом</Link>
      </div>
      <div>
        {fio ? (
          <Link to="/account" className="logo-link">{fio}</Link>
        ) : (
          <Link to="/account" className="profile-button">Личный кабинет</Link>
        )}
        <button className="logout-button" onClick={onLogout}>Выйти</button>
      </div>
    </header>
  );
}

export default Header;
