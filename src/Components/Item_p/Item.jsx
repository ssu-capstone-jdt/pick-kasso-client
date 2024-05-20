import React from 'react';
import './Item.css';

const Item = ({ image, nickname, title, link, curriculum_title, curriculum_info }) => {
  return (
    <div className='item'>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{nickname}</p>
      <p>{curriculum_title}</p>
      <p>{curriculum_info}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">View Painting</a>
    </div>
  );
}

export default Item;
