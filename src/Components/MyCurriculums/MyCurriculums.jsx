import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './MyCurriculums.css';
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

const MyCurriculums = () => {
  const [curriculums, setCurriculums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/curriculums')
      .then(response => {
        setCurriculums(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch curriculums:', error);
      });
  }, []);

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

  const handleClick = (id) => {
    navigate(`/curriculuminfo/${id}`);
  };

  return (
    <div className="curriculum-container">
      {curriculums.map((curriculum, index) => (
        <div key={index} className="curriculum-item">
          <div onClick={() => handleClick(curriculum.curriculum_response.curriculum_id)}>
            <img
              src={curriculum.curriculum_response.curriculum_painting || getImageById(curriculum.curriculum_response.curriculum_id)}
              alt={curriculum.curriculum_response.curriculum_title}
            />
            <h3>{curriculum.curriculum_response.curriculum_title}</h3>
            <p>{curriculum.curriculum_response.curriculum_info}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCurriculums;
