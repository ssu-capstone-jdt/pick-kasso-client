import React, { useState } from 'react';
import MyPost from '../Components/MyPost/MyPost';
import MyCurriculums from '../Components/MyCurriculums/MyCurriculums';
import './MyPage.css';
import userImage from '../Components/Assets/userImage.png';
import setIcon from '../Components/Assets/setIcon.png';
import arrow_ICON from '../Components/Assets/arrow_ICON.png';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState(1);
  const [hoverState, setHoverState] = useState({ button1: false, button2: false });

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleHover = (buttonId, isHovering) => {
    setHoverState(prev => ({ ...prev, [buttonId]: isHovering }));
  };

  return (
    <div className='mypage'>
      <div className="mypage-left">
        <div className="mypage-user">
          <img src={userImage} alt="" className="profile-pic" />
          <p>nickname</p>
          <img src={setIcon} alt="" className="settings-icon" />
        </div>
        <div className="mypage-nav-bar">
          <div className="button-container" onMouseEnter={() => handleHover('button1', true)} onMouseLeave={() => handleHover('button1', false)}>
            <button
              style={activeButton === 1 ? { backgroundColor: '#9EB8E8', color: 'white' } : {}}
              onClick={() => handleButtonClick(1)}>
              나의 그림
            </button>
            {hoverState.button1 && <img src={arrow_ICON} alt="Arrow" className="button-icon" />}
          </div>
          <div className="button-container" onMouseEnter={() => handleHover('button2', true)} onMouseLeave={() => handleHover('button2', false)}>
            <button
              style={activeButton === 2 ? { backgroundColor: '#9EB8E8', color: 'white' } : {}}
              onClick={() => handleButtonClick(2)}>
              나의 보관함
            </button>
            {hoverState.button2 && <img src={arrow_ICON} alt="Arrow" className="button-icon" />}
          </div>
        </div>
      </div>
      <div className="mypage-right">
        {activeButton === 1 ? <h>나의 그림</h> : <h>나의 보관함</h>}
        <hr/>
        {activeButton === 1 ? <MyPost/> : <MyCurriculums/>}
      </div>
    </div>
  );
};

export default MyPage;
