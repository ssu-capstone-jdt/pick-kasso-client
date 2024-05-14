import React from 'react'
import Calendar from '../Components/Calendar/Calendar'
import Popular from '../Components/Popular/Popular'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <Calendar/>
      <div className="h-mycrr">
        <div className="left">
          <p>나의 커리큘럼</p>
        </div>
        <div className="right">
          <p>전체 보기</p>
        </div>
      </div>
      <Popular/>
    </div>
  )
}

export default Home
