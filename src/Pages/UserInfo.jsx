import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../Components/api';
import defaultUserImage from '../Components/Assets/userImage.png';
import './UserInfo.css';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [deletePaintingState, setDeletePaintingState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        api.get('/users', { headers: { Authorization: `Bearer ${accessToken}` } })
          .then(response => {
            const userData = response.data.data;
            sessionStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
          })
          .catch(error => {
            console.error("Error fetching user data: ", error);
          });
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    Cookies.remove('access_token');
    setUser(null);
    window.location.reload();
  };

  const handleCheckboxChange = () => {
    setDeletePaintingState(!deletePaintingState);
  };

  const handleWithdrawal = () => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      const data = {
        delete_painting_state: deletePaintingState
      };

      api.delete('/users/withdrawal', {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: data,
      })
      .then(response => {
        if (response.status === 200) {
          console.log('Successfully withdrawn');
          sessionStorage.removeItem('user');
          setUser(null);
          window.location.reload();
        } else {
          console.error("Unexpected response status: ", response.status);
        }
      })
      .catch(error => {
        if (error.response) {
          console.error("Error during withdrawal: ", error.response.data);
          console.error("Response status: ", error.response.status);
          console.error("Response headers: ", error.response.headers);
        } else if (error.request) {
          console.error("No response received: ", error.request);
        } else {
          console.error("Error setting up request: ", error.message);
        }
      });
    } else {
      console.error("No access token found");
    }
  };

  return (
    <div className="user-info-container">
      {user ? (
        <>
          <img src={user.profile || defaultUserImage} alt="User" className="user-profile-image" />
          <h2 className="user-nickname">{user.nickname}</h2>
          <button onClick={handleLogout} className="logout-button">로그아웃</button>
          <button onClick={() => setIsModalOpen(true)} className="withdrawal-button">탈퇴</button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                <p>정말 탈퇴하시겠습니까?</p>
                <label style={{ marginRight: '8px'}} >
                  <input style={{ marginRight: '5px', fontSize: '15px' }}
                    type="checkbox"
                    checked={deletePaintingState}
                    onChange={handleCheckboxChange}
                  />
                  &nbsp;포스트한 그림도 같이 삭제하기
                </label>
                <button className="open-modal-button" onClick={handleWithdrawal}>확인</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;
