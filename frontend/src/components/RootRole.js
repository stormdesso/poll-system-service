import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RootCard from './RootCard';
import './admincard.css';

function RootRole() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/account/all', {
        params: {
          page: page,
          size: pageSize
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const users = await response.data;
        setUsers(users.filter(user => !user.blocked));
        const totalCount = response.data.totalCount || 0;
        setTotalPages(Math.ceil(totalCount / pageSize));
      } else {
        console.error('Ошибка при получении пользователей');
      }
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAdmin = async (user) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/account/edit/users', [{
        ...user,
        roles: ["admin"]
      }],
      {
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      console.log("Роль администратора успешно назначена");
      fetchUsers(currentPage);
    } else {
      console.error("Ошибка при попытке назначить роль администратора")
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRevokeAdmin = async (user) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/account/edit/users', [{
        ...user,
        roles: ["user"]
      }],
      {
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      console.log("Роль администратора успешно отозвана");
      fetchUsers(currentPage);
    } else {
      console.error("Ошибка при попытке отозвать роль администратора")
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="root-role-page">
      {loading ? (
        <p>Загрузка пользователей...</p>
      ) : users.length === 0 ? (
        <p>Пользователи не найдены.</p>
      ) : (
        <div>
          <div className="user-cards">
            {users.map(user => (
              <RootCard
                key={user.id}
                user={user}
                onGrantAdmin={handleGrantAdmin}
                onRevokeAdmin={handleRevokeAdmin}
              />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              &#8592; 
            </button>
            <span>Страница {currentPage + 1} из {totalPages || 1}</span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
              &#8594; 
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RootRole;
