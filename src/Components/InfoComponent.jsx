import React from 'react';
import { useNavigate } from 'react-router-dom';
import curriculums_1 from './Assets/curriculums_1.jpg';
import curriculums_2 from './Assets/curriculums_2.jpg';
import curriculums_3 from './Assets/curriculums_3.jpg';
import curriculums_4 from './Assets/curriculums_4.jpg';
import curriculums_5 from './Assets/curriculums_5.jpg';
import curriculums_6 from './Assets/curriculums_6.jpg';
import curriculums_7 from './Assets/curriculums_7.jpg';
import curriculums_8 from './Assets/curriculums_8.jpg';
import curriculums_9 from './Assets/curriculums_9.jpg';
import curriculums_10 from './Assets/curriculums_10.jpg';

function InfoComponent({ title, info, background, roundCount, difficulty, state, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/curriculum/${id}`);
  };

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

  if (state !== 'Pending') {
    return null;
  }

  return (
    <div className="info-container" onClick={handleClick}>
      <h2>{title}</h2>
      <p>{info}</p>
      <img src={background || getImageById(id)} alt={title} />
      <p>Number of Rounds: {roundCount}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Status: {state}</p>
      <p>id: {id}</p>
    </div>
  );
}

export default InfoComponent;
