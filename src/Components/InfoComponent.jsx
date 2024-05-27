import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoComponent({ title, info, background, roundCount, difficulty, state, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/curriculum/${id}`);
  };

  return (
    <div className="info-container" onClick={handleClick}>
      <h2>{title}</h2>
      <p>{info}</p>
      <img src={background} alt="Background" />
      <p>Number of Rounds: {roundCount}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Status: {state}</p>
      <p>id: {id}</p>
    </div>
  );
}

export default InfoComponent;
