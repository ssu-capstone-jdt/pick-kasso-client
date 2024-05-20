import React, { useState, useEffect } from 'react';
import api from '../api'; // 수정된 api 인스턴스 임포트
import './Posts.css';
import Item from '../Item_p/Item';

const Posts = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    api.get("/paintings/all") // 수정된 api 인스턴스 사용
      .then(response => {
        setPaintings(response.data);
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
            nickname={item.member_nickname}
            title={item.painting_title}
            link={item.painting_link}
            curriculum_title={item.curriculum_title}
            curriculum_info={item.curriculum_info}
          />
        ))}
      </div>
    </div>
  );
}

export default Posts;
