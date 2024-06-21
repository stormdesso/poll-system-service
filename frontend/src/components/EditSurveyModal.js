import React, { useEffect, useState } from 'react';
import './styles.css'; 
import { getDate } from '../utils/dateConverter';

function EditSurveyModal({ closeModal, survey }) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    cyclic: '',
    description: '',
    file: null,
    pollValues: ['', ''],
    scheduleType: '',
    multi: '',
  });

  useEffect(() => {
    setFormData({
      name: survey.name,
      description: survey.description,
      cyclic: survey.cyclical ? 'Да': 'Нет',
      scheduleType: survey.type,
      startDate: getDate(survey.startDate),
      endDate: getDate(survey.endDate),
      multi: survey.maxNumberAnswersByUser == '1' ? 'Нет' : 'Да',
      pollValues: survey.pollValues.map(poll => ({id: poll.id, value: poll.value, vote: 0})),
      file: null
    })
  }, [])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handlePollValueChange = (index, value) => {
    const newPollValues = formData.pollValues.map((pollValue, i) => {
      if (i === index) {
        return { ...pollValue, value: value };
      }
      return pollValue;
    });
    setFormData({
      ...formData,
      pollValues: newPollValues
    });
  };

  const addPollValue = () => {
    setFormData({
      ...formData,
      pollValues: [...formData.pollValues, '']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, startDate, endDate, cyclic, description, file, pollValues, scheduleType, multi } = formData;

    const payload = {
      id: survey.id,
      cyclical: cyclic === "Да",
      description: description,
      pollValues: pollValues,
      name: name,
      startDate: startDate,
      endDate: endDate,
      maxNumberAnswersByUser: multi === 'Да' ? pollValues.length : 1,
      type: cyclic === 'Да' ? scheduleType : 'NO_SCHEDULE',
      status: survey.status
    };
    try {
      const response = await fetch('http://localhost:8080/api/v1/poll/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Опрос успешно отредактирован');
        const pollId = result.id; 

        if (file) {
          const fileFormData = new FormData();
          fileFormData.append('files', file);
          fileFormData.append('pollId', pollId);

          try {
            const fileResponse = await fetch('http://localhost:8080/api/v1/file/upload?pollId=' + pollId, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: fileFormData
            });

            if (fileResponse.ok) {
              console.log('Файл загружен успешно');
            } else {
              console.error('Ошибка при загрузке файла');
            }
          } catch (error) {
            console.error('Ошибка:', error);
          }
        }
        closeModal();
      } else {
        console.error('Ошибка при создании опроса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Редактирование опроса</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              Название опроса:
              <input type="text" name="title" value={formData.name} onChange={handleChange} />
            </label>
            <label>
              Описание:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </label>
            <label>
              Дата начала:
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </label>
            <label>
              Дата окончания:
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </label>
            <label>
              Циклический опрос:
              <select name="cyclic" value={formData.cyclic} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Выберите вариант</option>
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
              </select>
            </label>
            <label>
              Тип цикличности опроса:
              <select name="scheduleType" value={formData.scheduleType} onChange={handleChange} style={{ width: '100%' }} disabled={formData.cyclic !== "Да"}>
                <option value="">Выберите вариант</option>
                <option value="EVERY_MONTH">Каждый месяц</option>
                <option value="EVERY_WEEK">Каждую неделю</option>
                <option value="EVERY_YEAR">Каждый год</option>
              </select>
            </label>
            <label>
             Несколько вариантов ответа:
             <select name="multi" value={formData.multi} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Выберите вариант</option>
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
              </select>
            </label>
            {formData.pollValues.map((pollValue, index) => (
              <div key={index}>
                <label>
                  Вариант {index + 1}:
                  <input
                    type="text"
                    value={pollValue.value}
                    onChange={(e) => handlePollValueChange(index, e.target.value)}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={addPollValue}>Добавить вариант</button>
            <label>
              Прикрепить файл:
              <input type="file" name="file" onChange={handleChange} />
            </label>
            <div className="button-container">
              <button type="submit" className="submit-button">Отправить на рассмотрение</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSurveyModal;
