import React, { useEffect, useState } from 'react';
import './admincard.css';

function AddressConfirmationCard({ request, onAccept, onDeny }) {
  const { userId, city, street, houseNumber, apartmentNumber, action } = request;
  const [fullName, setFullName] = useState('');
  const [addressInfo, setAddressInfo] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/account/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const user = await response.json();
        setFullName(user.fullName);
        setAddressInfo(user.addressInfos.at(-1));
      }  else {
        console.error("Пользователь не найден");
      }
    } catch (e) {
      console.error(e);
    }
    
  }

  return (
    <div className="address-card">
      <div className="address-header">
        <h2>Запрос на {action == 'ADD' ? 'добавление' : 'удаление'} адреса</h2>
        <div className="details">
          <p>ФИО: {fullName}</p>
          <p>Город: {addressInfo.city}</p>
          <p>Улица: {addressInfo.street}</p>
          <p>Дом: {addressInfo.houseNumber}</p>
          <p>Квартира: {addressInfo.apartmentNumber}</p>
          <p>Смена адреса на: Г. {city}, Ул. {street}, Д. {houseNumber}, Кв. {apartmentNumber}</p>
        </div>
        <div className="actions">
          <button className="approve-button" onClick={() => onAccept(request, userId, action)}>Принять</button>
          <button className="reject-button" onClick={() => onDeny(request, userId, action)}>Отклонить</button>
        </div>
      </div>
    </div>
  );
}

export default AddressConfirmationCard;
