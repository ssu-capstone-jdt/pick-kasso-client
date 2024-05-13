import React from 'react'
import Curriculums from '../Components/Curriculums/Curriculums'
import './Curriculum.css'

const Curriculum = () => {
  return (
    <div>
      <div className="curriculum">
        <div className="header">
          <h1>커리큘럼 보기</h1>
          <hr/>
          <div className="header-info">
            <p>Pick카소에서 제공하는 커리큘럼입니다.</p>
            <p>난이도와 회차 정보를 확인하고 이용해 주세요.</p>
          </div>
        </div>
        <div className="nav-diff">
          <button>전체</button>
          <button>초급</button>
          <button>중급</button>
          <button>상급</button>
        </div>
        <Curriculums/>
      </div>
      
    </div>
  )
}

export default Curriculum
