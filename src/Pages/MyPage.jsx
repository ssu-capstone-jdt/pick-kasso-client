import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyPost from '../Components/MyPost/MyPost';
import MyCurriculums from '../Components/MyCurriculums/MyCurriculums';
import './MyPage.css';
import userImage from '../Components/Assets/userImage.png';
import setIcon from '../Components/Assets/setIcon.png';
import arrow_ICON from '../Components/Assets/arrow_ICON.png';

const MyPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialActiveButton = parseInt(queryParams.get('activeButton'), 10) || 1;

  const [activeButton, setActiveButton] = useState(initialActiveButton);
  const [hoverState, setHoverState] = useState({ button1: false, button2: false });
  const [menu, setMenu] = useState("home");

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleHover = (buttonId, isHovering) => {
    setHoverState(prev => ({ ...prev, [buttonId]: isHovering }));
  };

  useEffect(() => {
    setActiveButton(initialActiveButton);
    window.scrollTo(0, 0);
  }, [initialActiveButton]);

  return (
    <div className='mypage'>
      <div className="mypage-left">
        <div className="mypage-user">
          <img src={userImage} alt="" className="profile-pic" />
          <p>nickname</p>
          <div className="mypage-user-settings" onClick={() => { setMenu("user") }}>
            <Link to="/user">
              <img src={setIcon} alt="" />
            </Link>
            {menu === "user" ? <hr /> : <></>}
          </div>
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
