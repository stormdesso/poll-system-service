import React from 'react';
import './admincard.css';
import { formatDate } from '../utils/dateConverter';

function UserAdminCard({ user, onToggleStatus, onDelete }) {
  const { id, fullName, birthdate, blocked } = user;

  return (
    <div className="user-card">
      <div className="user-header">
        <h2>{fullName}</h2>
        <div className="details">
          <p>Дата рождения: {formatDate(birthdate)}</p>
          <p>Статус аккаунта: {blocked ? <span style={{ color: 'red' }}>Заблокирован</span> : <span style={{ color: 'green' }}>Активен</span>}</p>
        </div>
        <div className="actions">
          <button className={blocked ? 'activate-button' : 'block-button'} onClick={() => onToggleStatus(id)}>
            {blocked ? 'Активировать' : 'Заблокировать'}
          </button>
          <button className="delete-button" onClick={() => onDelete(id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default UserAdminCard;
