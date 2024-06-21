import React from 'react';
import './admincard.css';
import { formatDate } from '../utils/dateConverter';

function RootPage({ user, onGrantAdmin, onRevokeAdmin }) {
  const { id, fullName, birthdate, blocked, roles} = user;

  const isAdmin = roles.includes('admin');

  return (
    <div className="user-card">
      <div className="user-header">
        <h2>{fullName}</h2>
        <div className="details">
          <p>Дата рождения: {formatDate(birthdate)}</p>
          <p>Статус аккаунта: {blocked ? <span style={{ color: 'red' }}>Заблокирован</span> : <span style={{ color: 'green' }}>Активен</span>}</p>
          <p>Роль: {isAdmin ? <span style={{ color: 'blue' }}>Администратор</span> : <span style={{ color: 'black' }}>Пользователь</span>}</p>
        </div>
        <div className="actions">
          {isAdmin ? (
            <button className="block-button" onClick={() => onRevokeAdmin(user)}>Отозвать роль администратора</button>
          ) : (
            <button className="activate-button" onClick={() => onGrantAdmin(user)}>Назначить роль администратора</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RootPage;
