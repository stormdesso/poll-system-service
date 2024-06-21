import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MySurveyCard from './MySurveyCard';
import CreateSurveyModal from './CreateSurveyModal';
import './styles.css';
import EditSurveyModal from './EditSurveyModal';

function MySurveysPage() {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(20); 
  const [editingSurvey, setEditingSurvey] = useState(null);

  useEffect(() => {
    fetchSurveys();
  }, [page]);

  const fetchSurveys = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/poll/suggested_filtered_list', [
        {
          key: 'creatorUserId',
          value: localStorage.getItem('id')
        }
      ], {
        params: {
          page: page,
          limit: limit,
          sort: 'id'
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setSurveys(response.data.items);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } else {
        console.error('Ошибка при получении списка опросов');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleEdit = (survey) => {
    setEditingSurvey(survey);
  };

  const handleSave = async (updatedSurvey) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/poll/update', updatedSurvey, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setEditingSurvey(null);
        fetchSurveys();
      } else {
        console.error('Ошибка при обновлении опроса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleCancel = () => {
    setEditingSurvey(null);
  };

  return (
    <div className="my-surveys-page">
      <div className="surveys-list">
        {surveys.map((survey) => (
          <MySurveyCard
            key={survey.id}
            survey={survey}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          &#8592; 
        </button>
        <span>Страница {page + 1} из {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>
          &#8594; 
        </button>
      </div>
      {editingSurvey && (
        <EditSurveyModal
          survey={editingSurvey}
          closeModal={handleCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default MySurveysPage;
