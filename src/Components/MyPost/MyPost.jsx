import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyPost.css';
import moreIcon from '../Assets/more_ICON.png';

function MyPost() {
  const [paintings, setPaintings] = useState([]);
  const [showDropdown, setShowDropdown] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/paintings')
      .then(response => {
        setPaintings(response.data.painting_list);
        let initialDropdownState = {};
        response.data.painting_list.forEach((painting, index) => {
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

  const deletePainting = (paintingId) => {
    axios.delete('http://localhost:8080/paintings', { data: { painting_id: paintingId } })
      .then(() => {
        setPaintings(prev => prev.filter(painting => painting.painting_id !== paintingId));
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
              <button onClick={() => deletePainting(painting.painting_id)}>삭제하기</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyPost;
