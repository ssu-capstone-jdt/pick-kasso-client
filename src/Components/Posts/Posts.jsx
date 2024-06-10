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
        const sortedPaintings = response.data.data.reverse();
        setPaintings(sortedPaintings);
      })
      .catch(error => {
        console.error('There was an error fetching the paintings', error);
      });
  }, []);

  const handleItemClick = (painting) => {
    navigate(`/paintinginfo`, {
      state: {
        curriculum_id: painting.curriculum_id,
        member_nickname: painting.member_nickname,
        painting_link: painting.painting_link,
        painting_title: painting.painting_title,
        curriculum_title: painting.curriculum_title,
        curriculum_info: painting.curriculum_info,
      }
    });
  };

  return (
    <div className="post-grid">
      {paintings.map((item, i) => (
        <Item
          key={i}
          id={item.curriculum_id}
          image={item.painting_link}
          nickname={item.member_nickname}
          title={item.painting_title}
          curriculum_title={item.curriculum_title}
          curriculum_info={item.curriculum_info}
          handleClick={() => handleItemClick(item)}
        />
      ))}
    </div>
  );
}

export default Posts;
