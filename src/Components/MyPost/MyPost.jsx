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

  const handleDelete = (paintingId) => {
    api.delete(`/paintings/${paintingId}`)
      .then(() => {
        setPaintings(prev => prev.filter(painting => painting.id !== paintingId));
        setDropdownVisible(null);
        alert('삭제 완료');
      })
      .catch(error => {
        console.error('Failed to delete painting:', error);
        alert('Failed to delete painting');
      });
  };

  const handleClick = (painting) => {
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
    window.scrollTo(0, 0);
  };

  return (
    <div className="painting-container">
      {paintings.map((painting, index) => (
        <div key={index} className="painting-item">
          <div onClick={() => handleClick(painting)}>
            <img className='painting-image' src={painting.painting_link} alt={painting.painting_title} />
          </div>
          <div className="more-icon-container" onClick={() => handleMoreClick(index)}>
            <img src={moreIcon} alt="More" className="more-icon" />
            {dropdownVisible === index && (
              <div ref={dropdownRef} className="dropdown-menu">
                <button onClick={() => handleDelete(painting.id)}>삭제하기</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPost;
