import React, { useEffect, useState } from 'react';
import './MyCurriculums.css'
import axios from 'axios';
import './MyCurriculums.css'

const MyCurriculums = () => {
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/curriculums')
      .then(response => {
        setCurriculums(response.data.curriculum_list);
      })
      .catch(error => {
        console.error('Failed to fetch curriculums:', error);
      });
  }, []);

  return (
    <div className="curriculum-container">
      {curriculums.map((curriculum, index) => (
        <div key={index} className="curriculum-item">
          <img src={curriculum.cur_background} alt={curriculum.cur_title} />
          <h3>{curriculum.cur_title}</h3>
          <p>{curriculum.cur_info}</p>
          <p>Rounds: {curriculum.cur_round_count}</p>
          <p>Difficulty: {curriculum.cur_difficulty}</p>
          <p>Status: {curriculum.cur_state}</p>
        </div>
      ))}
    </div>
  );
}

export default MyCurriculums
