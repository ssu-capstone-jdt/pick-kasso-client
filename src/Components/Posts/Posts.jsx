import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Posts.css';
import Item from '../Item_p/Item';

const Posts = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/paintings/all")
      .then(response => {
        setPaintings(response.data.painting_list);
      })
      .catch(error => {
        console.error('There was an error fetching the paintings', error);
      });
  }, []);

  return (
    <div className='posts'>
      <div className="post-grid">
        {paintings.map((item, i) => (
          <Item key={i}
            image={item.painting_profile}
            nickname={item.painter_nickname}
            title={item.painting_title}
            created_at={item.created_at}
            curriculum_title={item.curriculum_title}
            curriculum_info={item.curriculum_info}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
