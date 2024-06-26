import React from 'react';
import './Item.css';

const Item = ({ image, nickname, title, curriculum_title, curriculum_info, handleClick }) => {
  const truncatedTitle = title.length > 28 ? `${title.slice(0, 28)}...` : title;

  return (
    <div className="item-container" onClick={handleClick}>
      <img src={image} alt={title} className="item-image" />
      <div className="item-overlay">
        <h3 className="item-title">{curriculum_title}</h3>
        <p className="item-info">{curriculum_info}</p>
        <p className='user-text'>❝ {truncatedTitle} ❞</p>
        <p className="item-nickname">{nickname}</p>
      </div>
    </div>
  );
}

export default Item;
