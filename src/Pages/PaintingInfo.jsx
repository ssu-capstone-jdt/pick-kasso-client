import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaintingInfo.css'

const PaintingInfo = () => {
  const location = useLocation();
  const {
    curriculum_id,
    member_nickname,
    painting_link,
    painting_title,
    curriculum_title,
    curriculum_info
  } = location.state;
  const handleClick = () => {
    window.location.href = `/curriculum/${curriculum_id}`;
  };

  return (
    <div className='PaintingInfo'>
      <div className="PaintingInfo-left">
        <img src={painting_link} alt={painting_title} />
      </div>
      <div className="PaintingInfo-right">
      <div className="PaintingInfo-currInfo-grid" 
      onClick={handleClick} style={{ cursor: 'pointer' }}>
          <h2>{curriculum_title}</h2>
          <p style={{ fontSize: '13px', color: '#8C8C8C' }}>{curriculum_info}</p>
        </div>
        <h2>{painting_title}</h2>
        <p>유저: {member_nickname}</p>
        <img></img>
      </div>
    </div>
  );
}

export default PaintingInfo;
