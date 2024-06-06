import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../Components/api';
import defaultUserImage from '../Components/Assets/userImage.png';
import './UserInfo.css';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [deletePaintingState, setDeletePaintingState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

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
    setIsLoading(true); // 로딩 상태 활성화
    window.location.href = '/home';
    sessionStorage.removeItem('user');
    Cookies.remove('access_token');
    setUser(null);
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

  if (isLoading) {
    return <div className="loading-screen"></div>; // 로딩 상태 시 빈 화면 표시
  }

  return (
    <div className="user-info-container">
      {user ? (
        <div className='user-info-area'>
        <h1>유저 프로필</h1>
        <hr/>
        <div className="user-info-image">
          <h2>사진</h2>
          <img src={user.profile || defaultUserImage} alt="User" className="user-profile-image" />
        </div>
        <div className="user-info-nickname">
          <h2>닉네임</h2>
          <input value={user.nickname} readOnly></input>
        </div>
          <button onClick={handleLogout} className="logout-button">로그아웃</button>
          <div className="withdrawal-button-area">
          <button className="back-button" onClick={() => window.history.back()}>이전</button>
            <button onClick={() => setIsModalOpen(true)} className="withdrawal-button">탈퇴</button>
          </div>
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
                  &nbsp;포스트한 모든 그림을 삭제합니다
                </label>
                <button className="open-modal-button" onClick={handleWithdrawal}>확인</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>로그아웃 하는 중...</p>
      )}
    </div>
  );
};

export default UserInfo;
