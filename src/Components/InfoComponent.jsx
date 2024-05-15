import React from 'react';

function InfoComponent({ title, info, background, roundCount, difficulty, state }) {
  return (
    <div className="info-container">
      <h2>{title}</h2>
      <p>{info}</p>
      <img src={background} alt="Background" />
      <p>Number of Rounds: {roundCount}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Status: {state}</p>
    </div>
  );
}

export default InfoComponent;
