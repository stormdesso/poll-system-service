import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { formatDate } from '../utils/dateConverter';

function SurveyTreat({ survey }) {
  const [expanded, setExpanded] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(survey.status);

  useEffect(() => {
    if (expanded) {
      fetchFiles();
    }
  }, [expanded]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/file?pollId=${survey.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const files = await response.json();
        setFiles(files);
      } else {
        console.error('Ошибка при получении файлов');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const downloadFiles = async (fileIds) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/file/download_list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ pollId: survey.id, ids: fileIds })
      });

      if (response.ok) {
        const filesData = await response.json();
        filesData.forEach(file => {
          window.open(`data:${file.type};base64,${file.data}`, '_blank');
        });
      } else {
        console.error('Ошибка при скачивании файлов');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/poll/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          status: 'active',
          id: survey.id,
          pollValues: survey.pollValues,
          startDate: survey.startDate,
          endDate: survey.endDate,
          type: survey.type,
          name: survey.name,
          description: survey.description,
          maxNumberAnswersByUser: survey.maxNumberAnswersByUser
        })
      },
    );
      if (response.ok) {
        console.log('Опрос принят');
        setStatus('active');
      } else {
        console.error('Ошибка при принятии опроса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/poll/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          status: 'returned',
          id: survey.id,
          pollValues: survey.pollValues,
          startDate: survey.startDate,
          endDate: survey.endDate,
          type: survey.type,
          name: survey.name,
          description: survey.description,
          maxNumberAnswersByUser: survey.maxNumberAnswersByUser
        })
      },
    );
      if (response.ok) {
        console.log('Опрос отклонен');
        setStatus("returned");
      } else {
        console.error('Ошибка при отклонении опроса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      {status !== 'active' && (
        <div className={`survey-card ${expanded ? 'expanded' : ''}`}>
        <div className="survey-header">
          <h2>{survey.name}</h2>
          <div className="details">
            {status === 'proposed' ? <span style={{ color: 'orange' }}>В рассмотрении</span> : <span style={{ color: 'grey' }}>Отклонен</span>}
          </div>
          <div className="details">
            <p>Дата проведения: {formatDate(survey.startDate)} - {formatDate(survey.endDate)}</p>
          </div>
          <button className="toggle-button" onClick={toggleExpanded}>
            {expanded ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
        {expanded && (
          <>
          <div className="expanded-content">
            <p>Описание: {survey.description}</p>
            <div className="files">
              <h3>Прикрепленные файлы:</h3>
              <ul>
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <li key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                      <button onClick={() => downloadFiles([file.id])}>Скачать</button>
                    </li>
                  ))
                ) : (
                  <li>Нет прикрепленных файлов</li>
                )}
              </ul>
            </div>
            <div className="options">
              {survey.pollValues.length > 0 ? (
                <div>
                  {survey.pollValues.map((value, index) => (
                    <div key={index} className="option">
                      <input
                        type="radio"
                        name="option"
                        id={`option${index}`}
                        value={value.id}
                        checked={selectedOption && selectedOption.id === value.id}
                        onChange={() => setSelectedOption(value)}
                        disabled
                      />
                      <label htmlFor={`option${index}`}>{value.value}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Варианты ответов отсутствуют</p>
              )}
            </div>
            <div className="scale">
              <div className="progress-bar" style={{ width: `${(survey.numberVotes / survey.maxNumberVoted) * 100}%` }}></div>
            </div>
            
          </div>
          <div style={{marginTop: "18px"}}>
              <button className="approve-button" onClick={handleApprove}>Принять</button>
              <button  
                className="reject-button" 
                onClick={handleReject} 
                style={{marginLeft: "10px"}} 
                disabled={status === 'returned'}
              >
                Отклонить
              </button>
            </div>
          </>
          
          
        )}
      </div>
      )}
    </>
    
    
  );
}

export default SurveyTreat;
