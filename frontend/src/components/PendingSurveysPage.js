import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyTreat from './SurveyTreat';

function PendingSurveysPage() {
  const [pendingSurveys, setPendingSurveys] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchPendingSurveys = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/poll/suggested_filtered_list', [],
          {
            params: {
              sort: 'id',
              page: page,
              limit: limit
            },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          
        });
        setPendingSurveys(response.data.items);
      } catch (error) {
        console.error('Error fetching pending surveys:', error);
      }
    };
    fetchPendingSurveys();
  }, [page, limit]);

  const handleApprove = async (surveyId) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/poll/approve?pollId=${surveyId}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== surveyId));
    } catch (error) {
      console.error('Error approving survey:', error);
    }
  };

  const handleReject = async (surveyId) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/poll/reject?pollId=${surveyId}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== surveyId));
    } catch (error) {
      console.error('Error rejecting survey:', error);
    }
  };

  return (
    <div className="pending-surveys-page">
      
      {pendingSurveys.length > 0 ? (
        pendingSurveys.map((survey) => (
          <SurveyTreat
            key={survey.id}
            survey={survey}
          />
        ))
      ) : (
        <p>Нет опросов на рассмотрение.</p>
      )}
    </div>
  );
}

export default PendingSurveysPage;
