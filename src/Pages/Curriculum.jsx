import React, { useState } from 'react'
import Curriculums from '../Components/Curriculums/Curriculums'
import './Curriculum.css'

const Curriculum = () => {
  const [activeButton, setActiveButton] = useState(1);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  
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
        <button 
            style={activeButton === 1 ? { backgroundColor: '#FBCDD4', color: 'white' } : {}}
            onClick={() => handleButtonClick(1)}>
            전체
          </button>
          <button 
            style={activeButton === 2 ? { backgroundColor: '#FBCDD4', color: 'white' } : {}}
            onClick={() => handleButtonClick(2)}>
            초급
          </button>
          <button 
            style={activeButton === 3 ? { backgroundColor: '#FBCDD4', color: 'white'} : {}}
            onClick={() => handleButtonClick(3)}>
            중급
          </button>
          <button 
            style={activeButton === 4 ? { backgroundColor: '#FBCDD4', color: 'white' } : {}}
            onClick={() => handleButtonClick(4)}>
            상급
          </button>
        </div>
        <Curriculums activeButton={activeButton} />
      </div>
      
    </div>
  )
}

export default Curriculum
