import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Posts.css';
import Item from '../Item_p/Item';

const Posts = () => {
  const [paintings, setPaintings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/paintings/all")
      .then(response => {
        setPaintings(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the paintings', error);
      });
  }, []);

  const handleItemClick = (paintingId) => {
    navigate(`/paintinginfo/${paintingId}`);
  };

  return (
    <div className="post-grid">
      {paintings.map((item, i) => (
        <Item
          key={i}
          image={item.painting_profile}
          nickname={item.member_nickname}
          title={item.painting_title}
          link={item.painting_link}
          curriculum_title={item.curriculum_title}
          curriculum_info={item.curriculum_info}
          handleClick={() => handleItemClick(item.painting_title)}
        />
      ))}
    </div>
  );
}

export default Posts;
