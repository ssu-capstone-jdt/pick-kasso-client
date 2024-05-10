import React from 'react'
import './CurriculumCard.css'

const CurriculumCard = ({ curriculum_background, curriculum_title, curriculum_info }) => {
  return (
    <div className="curriculum-card">
      <img src={curriculum_background} alt={curriculum_title} />
      <div className="curriculum-info">
        <h3>{curriculum_title}</h3>
        <p>{curriculum_info}</p>
      </div>
    </div>
  );
};

export default CurriculumCard;
