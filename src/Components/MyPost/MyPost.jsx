import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // 수정된 api 인스턴스 사용
import './MyPost.css';
import moreIcon from '../Assets/more_ICON.png';

function MyPost() {
  const [paintings, setPaintings] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/paintings')
      .then(response => {
        setPaintings(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch paintings:', error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMoreClick = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  const handleDelete = (paintingLink) => {
    api.delete('/paintings', { data: { painting_link: paintingLink } })
      .then(() => {
        setPaintings(prev => prev.filter(painting => painting.painting_link !== paintingLink));
        setDropdownVisible(null);
        alert('Painting deleted successfully');
      })
      .catch(error => {
        console.error('Failed to delete painting:', error);
        alert('Failed to delete painting');
      });
  };

  const handleClick = (paintingLink) => {
    navigate(`/paintinginfo/${paintingLink}`);
  };

  return (
    <div className="painting-container">
      {paintings.map((painting, index) => (
        <div key={index} className="painting-item">
          <div onClick={() => handleClick(painting.painting_link)}>
            <img src={painting.painting_link} alt={painting.painting_title} />
          </div>
          <div className="more-icon-container" onClick={() => handleMoreClick(index)}>
            <img src={moreIcon} alt="More" className="more-icon" />
            {dropdownVisible === index && (
              <div ref={dropdownRef} className="dropdown-menu">
                <button onClick={() => handleDelete(painting.painting_link)}>삭제하기</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPost;
