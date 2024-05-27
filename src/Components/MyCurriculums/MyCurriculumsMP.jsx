import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './MyCurriculums.css';
import more_ICON from '../Assets/more_ICON.png';
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

const MyCurriculumsMP = () => {
  const [curriculums, setCurriculums] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    api.get('/curriculums')
      .then(response => {
        setCurriculums(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch curriculums:', error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const handleMoreClick = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleDelete = (id) => {
    api.delete(`/curriculums/${id}`)
      .then(response => {
        setCurriculums(curriculums.filter(cur => cur.curriculum_response.curriculum_id !== id));
        setDropdownVisible(null);
      })
      .catch(error => {
        console.error('Failed to delete curriculum:', error);
      });
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
              src={curriculum.curriculum_response.curriculum_background || getImageById(curriculum.curriculum_response.curriculum_id)}
              alt={curriculum.curriculum_response.curriculum_title}
            />
            <h3>{curriculum.curriculum_response.curriculum_title}</h3>
            <p>{curriculum.curriculum_response.curriculum_info}</p>
            <p>Rounds: {curriculum.curriculum_response.curriculum_round_count}</p>
            <p>Difficulty: {curriculum.curriculum_response.curriculum_difficulty}</p>
            <p>Status: {curriculum.state}</p>
          </div>
          <div className="more-icon-container" onClick={() => handleMoreClick(curriculum.curriculum_response.curriculum_id)}>
            <img src={more_ICON} alt="more icon" />
            {dropdownVisible === curriculum.curriculum_response.curriculum_id && (
              <div ref={dropdownRef} className="dropdown-menu">
                <button onClick={() => handleDelete(curriculum.curriculum_response.curriculum_id)}>삭제하기</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCurriculumsMP;
