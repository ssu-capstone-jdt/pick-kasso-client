import React, { useState, useEffect } from 'react';
import api from '../api';
import './Curriculums.css';
import { useNavigate } from 'react-router-dom';
import curriculums_1 from '../Assets/curriculums_1.jpg';
import curriculums_2 from '../Assets/curriculums_2.jpg';
import curriculums_3 from '../Assets/curriculums_3.jpg';
import curriculums_4 from '../Assets/curriculums_4.jpg';
import curriculums_5 from '../Assets/curriculums_5.jpg';
import curriculums_6 from '../Assets/curriculums_6.jpg';
import curriculums_7 from '../Assets/curriculums_7.jpg';
import curriculums_8 from '../Assets/curriculums_8.jpg';
import curriculums_9 from '../Assets/curriculums_9.jpg';
import curriculums_10 from '../Assets/curriculums_10.jpg';

const Curriculums = ({ activeButton }) => {
  const [allCurriculums, setAllCurriculums] = useState([]);
  const [filteredCurriculums, setFilteredCurriculums] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const response = await fetch('/localCurriculums.json'); // 로컬 파일 경로 설정
        const localData = await response.json();
        const data = localData.data.filter(cur => cur.state === 'Pending');
        setAllCurriculums(data);
        filterCurriculums(data, activeButton);
      } catch (localError) {
        console.error('Error loading local data:', localError);
      }
    };

    api.get('/curriculums/all')
      .then(response => {
        const data = response.data.data.filter(cur => cur.state === 'Pending');
        setAllCurriculums(data);
        filterCurriculums(data, activeButton);
        setError(false);
      })
      .catch(error => {
        console.error('Error fetching curriculum data:', error);
        setError(true);
        loadLocalData();
      });
  }, [activeButton, setError]); // setError 추가

  useEffect(() => {
    filterCurriculums(allCurriculums, activeButton);
  }, [activeButton, allCurriculums]);

  const imageMap = {
    1: curriculums_1,
    2: curriculums_2,
    3: curriculums_3,
    4: curriculums_4,
    5: curriculums_5,
    6: curriculums_6,
    7: curriculums_7,
    8: curriculums_8,
    9: curriculums_9,
    10: curriculums_10,
  };

  const getImageById = (id) => {
    return imageMap[id] || curriculums_1;
  };

  const filterCurriculums = (data, buttonNumber) => {
    let filteredData;
    switch (buttonNumber) {
      case 1: 
        filteredData = data;
        break;
      case 2: 
        filteredData = data.filter(cur => cur.curriculum_response.curriculum_difficulty === 'Easy');
        break;
      case 3: 
        filteredData = data.filter(cur => cur.curriculum_response.curriculum_difficulty === 'Normal');
        break;
      case 4: 
        filteredData = data.filter(cur => cur.curriculum_response.curriculum_difficulty === 'Hard');
        break;
      default:
        filteredData = data;
    }
    setFilteredCurriculums(filteredData);
  };

  const translateDifficulty = (difficulty) => {
    switch(difficulty) {
      case 'Easy':
        return '초급';
      case 'Normal':
        return '중급';
      case 'Hard':
        return '상급';
      default:
        return difficulty;
    }
  };

  const translateState = (state) => {
    switch(state) {
      case 'Completed':
        return '완료';
      case 'InProgress':
        return '진행중';
      case 'Pending':
        return '진행 정보';
      default:
        return state;
    }
  };

  const handleClick = (id) => {
    navigate(`/curriculum/${id}`);
  };

  return (
    <div className='info-container'>
      {error}
      {filteredCurriculums.map((curriculum, index) => (
        <div key={index} className="curriculum-item" onClick={() => handleClick(curriculum.curriculum_response.curriculum_id)}>
          <img
            src={curriculum.curriculum_response.curriculum_painting || getImageById(curriculum.curriculum_response.curriculum_id)}
            alt={curriculum.curriculum_response.curriculum_title}
          />
          <div className="curr-tags">
            <div className="curr-tag-l">
              <p>{translateState(curriculum.state)}</p>
            </div>
            <div className="curr-tag-r">
              <p>{translateDifficulty(curriculum.curriculum_response.curriculum_difficulty)}</p>
              <p>{curriculum.curriculum_response.curriculum_round_count}회차</p>
            </div>
          </div>
          <h3>{curriculum.curriculum_response.curriculum_title}</h3>
          <p>{curriculum.curriculum_response.curriculum_info}</p>
        </div>
      ))}
    </div>
  );
}

export default Curriculums;
