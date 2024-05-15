import React from 'react';
import './Item.css';

const Item = (props) => {
  return (
    <div className='item'>
      <img src={props.image} alt="" />
      <p>{props.nickname}</p>
      <p>{props.title}</p> 
      <p>{props.created_at}</p> 
      <p>{props.curriculum_title}</p> 
      <p>{props.curriculum_info}</p>
    </div>
  );
}

export default Item;
