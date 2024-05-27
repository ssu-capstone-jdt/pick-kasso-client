import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../Components/Calendar/Calendar';
import './Home.css';
import MyCurriculums from '../Components/MyCurriculums/MyCurriculums';

const Home = () => {
  return (
    <div className='home'>
      <Calendar/>
      <div className="h-mycrr">
        <div className="left">
          <p>나의 커리큘럼</p>
        </div>
        <div className="right">
          <Link to="/mypage?activeButton=2" className="custom-link">
            <p>전체 보기</p>
          </Link>
        </div>
      </div>
      <MyCurriculums/>
    </div>
  )
}

export default Home;
