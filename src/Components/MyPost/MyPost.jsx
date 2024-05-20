import React, { useEffect, useState } from 'react';
import api from '../api'; // 수정된 api 인스턴스 사용
import './MyPost.css';
import moreIcon from '../Assets/more_ICON.png';

function MyPost() {
  const [paintings, setPaintings] = useState([]);
  const [showDropdown, setShowDropdown] = useState({});

  useEffect(() => {
    api.get('/paintings')
      .then(response => {
        setPaintings(response.data.data);
        let initialDropdownState = {};
        response.data.data.forEach((painting, index) => {
          initialDropdownState[index] = false;
        });
        setShowDropdown(initialDropdownState);
      })
      .catch(error => {
        console.error('Failed to fetch paintings:', error);
      });
  }, []);

  const toggleDropdown = (index) => {
    setShowDropdown(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const deletePainting = (paintingLink) => {
    api.delete('/paintings', { data: { painting_link: paintingLink } })
      .then(() => {
        setPaintings(prev => prev.filter(painting => painting.painting_link !== paintingLink));
        alert('Painting deleted successfully');
      })
      .catch(error => {
        console.error('Failed to delete painting:', error);
        alert('Failed to delete painting');
      });
  };

  return (
    <div className="painting-container">
      {paintings.map((painting, index) => (
        <div key={index} className="painting-item">
          <img src={painting.painting_link} alt={painting.painting_title} />
          <img src={moreIcon} alt="More" className="more-icon" onClick={() => toggleDropdown(index)} />
          {showDropdown[index] && (
            <div className="dropdown-menu">
              <button onClick={() => deletePainting(painting.painting_link)}>삭제하기</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyPost;
