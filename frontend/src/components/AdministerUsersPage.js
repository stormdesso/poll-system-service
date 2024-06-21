import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserAdminCard from './UserAdminCard';
import './admincard.css';

function AdministerUsersPage() {
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

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
        setUsers(response.data);
        const totalCount = response.data.totalCount || 0; 
        setTotalPages(Math.ceil(totalCount / pageSize));
      } else {
        console.error('Ошибка при получении пользователей');
      }
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };

  const handleToggleStatus = async (userId) => {
    const user = users.find(user => user.id === userId);
    const updatedStatus = !user.blocked;

    try {
      await axios.post('http://localhost:8080/api/v1/user/account/edit/users', [{
        ...user,
        blocked: updatedStatus
      }],
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, blocked: updatedStatus } : user));
    } catch (error) {
      console.error('Ошибка при переключении статуса пользователя:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete('http://localhost:8080/api/v1/user/account/delete/users', {
        params: { usersIds: userId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
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
    <div className="administer-users-page">
      {users.length === 0 ? (
        <p>Пользователи не найдены.</p>
      ) : (
        users.map(user => (
          <UserAdminCard 
            key={user.id} 
            user={user} 
            onToggleStatus={handleToggleStatus} 
            onDelete={handleDelete} 
          />
        ))
      )}
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
  );
}

export default AdministerUsersPage;
