import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { formatDate } from '../utils/dateConverter';

function SurveyCard({ survey, onVote }) {
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); 
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); 

  useEffect(() => {
    if (expanded) {
      fetchFiles();
      fetchChatMessages();
    }
  }, [expanded]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded && chatOpen) {
      fetchChatMessages();
    }
  };

  const handleChatButtonClick = () => {
    setChatOpen(!chatOpen); 
    if (!chatOpen && expanded) {
      fetchChatMessages();
    }
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

  const fetchChatMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/poll/chat/messages?pollId=${survey.id}&timeZone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const messages = await response.json();
        setMessages(messages);
      } else {
        console.error('Ошибка при получении сообщений чата');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={`survey-card ${expanded ? 'expanded' : ''}`}>
      <div className="survey-header">
        <h2>{survey.name}</h2>
        <div className='details'>
          {survey.status === 'active' ? <span style={{ color: 'green' }}>Активен</span> : <span style={{ color: 'red' }}>Закончен</span>}
        </div>
        <div className='details'>
          <p>Дата проведения: {formatDate(survey.startDate)} - {formatDate(survey.endDate)}</p>
          <p>Проголосовали: {survey.numberVotes} / {survey.maxNumberVoted}</p>
        </div>
        <button className="toggle-button" onClick={toggleExpanded}>
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      {expanded && (
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
                <p>Нет прикрепленных файлов</p>
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
                      disabled={survey.status !== 'active' || survey.userIsVoted}
                    />
                    <label htmlFor={`option${index}`}>{value.value}</label>
                  </div>
                ))}
              </div>
            ) : (
              <p>Варианты ответов отсутствуют</p>
            )}
          </div>
          <div style={{ marginTop: '10px' }}>
            <button 
              className="vote-button" 
              style={{ marginBottom: '10px' }} 
              disabled={survey.status !== 'active' || !selectedOption || survey.userIsVoted}
              onClick={() => onVote(selectedOption, survey.id)}
            >
                Проголосовать
            </button>
            <button className="chat-button" onClick={handleChatButtonClick}>{chatOpen ? 'Закрыть чат' : 'Чат'}</button>
            {chatOpen && (
              <div className="chat">
                <h3>Сообщения чата:</h3>
                <ul>
                  {messages.map((message, index) => (
                    <li key={index}>
                      <p>{message.message}</p>
                      <p>Отправлено: {formatDate(message.dateSentMessage)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="scale">
            <div className="progress-bar" style={{ width: `${(survey.numberVotes / survey.maxNumberVoted) * 100}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyCard;
