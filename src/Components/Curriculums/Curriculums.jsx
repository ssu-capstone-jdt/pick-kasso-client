import React, { useState, useEffect } from 'react';
import api from '../api'; // 수정된 api 인스턴스 사용
import InfoComponent from '../InfoComponent';
import './Curriculums.css';

const Curriculums = ({ activeButton }) => {
  const [curriculums, setCurriculums] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/curriculums/all')
      .then(response => {
        const data = response.data.data;
        filterCurriculums(data, activeButton);
        setError(false);
      })
      .catch(error => {
        console.error('Error fetching curriculum data:', error);
        setError(true);
      });
  }, [activeButton]);

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
    setCurriculums(filteredData);
  };

  return (
    <div>
      {error && <p>Error loading data!</p>}
      {curriculums.map((cur, index) => (
        <InfoComponent
          key={index}
          id={cur.curriculum_response.curriculum_id}
          title={cur.curriculum_response.curriculum_title}
          info={cur.curriculum_response.curriculum_info}
          background={cur.curriculum_response.curriculum_painting}
          roundCount={cur.curriculum_response.curriculum_round_count}
          difficulty={cur.curriculum_response.curriculum_difficulty}
          state={cur.state}
        />
      ))}
    </div>
  );
}

export default Curriculums;
