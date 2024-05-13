import React from 'react'
import Calendar from '../Components/Calendar/Calendar'
import Popular from '../Components/Popular/Popular'
import './Home.css'

const Home = () => {
  return (
    <div>
      {/* <Calendar/> */}
      <idv className="h-mycrr">
        <idv className="left">
          <p>나의 커리큘럼</p>
        </idv>
        <idv className="right">
          <p>전체 보기</p>
        </idv>
      </idv>
      <Popular/>
    </div>
  )
}

export default Home
