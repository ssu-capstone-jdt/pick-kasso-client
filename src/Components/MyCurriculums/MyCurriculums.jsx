import React, { useState, useEffect } from 'react';
import api from '../api'; 
import './MyCurriculums.css';

const MyCurriculums = () => {
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    api.get('/curriculums') 
      .then(response => {
        setCurriculums(response.data.data); 
      })
      .catch(error => {
        console.error('Failed to fetch curriculums:', error);
      });
  }, []);

  return (
    <div className="curriculum-container">
      {curriculums.map((curriculum, index) => (
        <div key={index} className="curriculum-item">
          <img src={curriculum.curriculum_response.curriculum_background} alt={curriculum.curriculum_response.curriculum_title} />
          <h3>{curriculum.curriculum_response.curriculum_title}</h3>
          <p>{curriculum.curriculum_response.curriculum_info}</p>
          <p>Rounds: {curriculum.curriculum_response.curriculum_round_count}</p>
          <p>Difficulty: {curriculum.curriculum_response.curriculum_difficulty}</p>
          <p>Status: {curriculum.state}</p>
        </div>
      ))}
    </div>
  );
}

export default MyCurriculums;
