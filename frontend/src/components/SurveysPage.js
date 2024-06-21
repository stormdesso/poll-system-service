import React, { useState, useEffect } from 'react';
import './styles.css';
import SurveyCard from './SurveyCard';
import CreateSurveyModal from './CreateSurveyModal';
import AdministerUsersPage from './AdministerUsersPage';
import PendingSurveysPage from './PendingSurveysPage';
import RootPage from './RootPage';
import MySurveysPage from './MySurveyPage'; 
import AddressConfirmationPage from './AddressConfirmationPage';
import RootRole from './RootRole';

function SurveysPage() {
  const userRole = localStorage.getItem('role');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(userRole === 'root' ? 'admin-list' : 'surveys');
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    if (activeTab === 'surveys' && userRole !== 'root') {
      fetchSurveys(currentPage);
    } else {
      setLoading(false); 
    }
  }, [activeTab, userRole, currentPage]);

  const fetchSurveys = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/poll/filtered_list?sort=id&page=${page}&limit=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify([]) 
      });

      if (response.ok) {
        const data = await response.json();
        setSurveys(data.items);
        const totalCount = data.totalCount || 0;
        setTotalPages(Math.ceil(totalCount / pageSize));
      } else {
        console.error('Ошибка при получении опросов');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'surveys') {
      setLoading(true);
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

  const handleVote = async (selectedOption, surveyId) => {
    if (!selectedOption) {
      console.error('Выберите вариант ответа');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/v1/poll/vote?pollId=${surveyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify([
          {
            id: selectedOption.id, 
            value: selectedOption.value, 
            votes: selectedOption.votes 
          }
        ])
      });

      if (response.ok) {
        console.log('Голос отправлен успешно');
        fetchSurveys(currentPage);
      } else {
        console.error('Ошибка при отправке голоса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="surveys-page">
      <div className="sidebar">
        <nav>
          {userRole !== 'root' && (
            <button className={`tab ${activeTab === 'surveys' ? 'active' : ''}`} onClick={() => handleTabChange('surveys')}>Опросы</button>
          )}
          {userRole !== 'admin' && userRole !== 'root' && (
            <button className={`tab ${activeTab === 'my-surveys' ? 'active' : ''}`} onClick={() => handleTabChange('my-surveys')}>Мои опросы</button>
          )}
          {userRole === 'admin' && (
            <>
              <button className={`tab ${activeTab === 'pending-surveys' ? 'active' : ''}`} onClick={() => handleTabChange('pending-surveys')}>Опросы на рассмотрение</button>
              <button className={`tab ${activeTab === 'administer-users' ? 'active' : ''}`} onClick={() => handleTabChange('administer-users')}>Администрирование пользователей</button>
              <button className={`tab ${activeTab === 'address-confirmation' ? 'active' : ''}`} onClick={() => handleTabChange('address-confirmation')}>Смена адресов</button>
            </>
          )}
          {userRole === 'root' && (
            <>
              <button className={`tab ${activeTab === 'admin-list' ? 'active' : ''}`} onClick={() => handleTabChange('admin-list')}>Список администраторов</button>
              <button className={`tab ${activeTab === 'root-roles' ? 'active' : ''}`} onClick={() => handleTabChange('root-roles')}>Роли</button>
            </>
          )}
          <button className={`tab ${activeTab === 'help' ? 'active' : ''}`} onClick={() => handleTabChange('help')}>Справка</button>
          {activeTab === 'surveys' && userRole !== 'root' && (
            <button className="create-survey-button" onClick={() => setIsModalOpen(true)}>Создать опрос</button>
          )}
        </nav>
      </div>
      <div className="content">
        <div className="tab-content">
          {loading ? (
            <p>Загрузка опросов...</p>
          ) : (
            <>
              {activeTab === 'surveys' && surveys.map((survey, index) => (
                <SurveyCard  
                  key={index} 
                  survey={survey}
                  onVote={handleVote}
                />
              ))}
              {activeTab === 'my-surveys' && (
                <MySurveysPage /> 
              )}
              {activeTab === 'pending-surveys' && (
                <PendingSurveysPage />
              )}
              {activeTab === 'administer-users' && (
                <AdministerUsersPage />
              )}
              {activeTab === 'address-confirmation' && ( 
                <AddressConfirmationPage />
              )}
              {activeTab === 'admin-list' && (
                <RootPage />
              )}
              {activeTab === 'root-roles' && (
                <RootRole /> 
              )}
              {activeTab === 'help' && (
                <div className="help-content">
                  <p>Здесь будет полезная информация о системе.</p>
                </div>
              )}
            </>
          )}
        </div>
        {activeTab === 'surveys' && !loading && (
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              &#8592; 
            </button>
            <span>Страница {currentPage + 1} из {totalPages || 1}</span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
              &#8594; 
            </button>
          </div>
        )}
      </div>
      {isModalOpen && <CreateSurveyModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default SurveysPage;
