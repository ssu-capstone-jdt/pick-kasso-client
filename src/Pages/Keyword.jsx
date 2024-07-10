import React, { useState } from 'react'
import Keywords from '../Components/Keywords/Keywords';

const Keyword = () => {
  const [activeButton, setActiveButton] = useState(1);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  
  return (
    <div>
      <div className="curriculum">
        <div className="header">
          <h1>키워드 추천</h1>
          <hr/>
          <div className="header-info">
            <p>오늘 뭐 그리지? 🤔 -오늘 그릴 소재가 고민이라면 제가 추천해 드릴게요! 😆</p>
            <p>함께 즐거운 그림을 그려보아요!</p>
          </div>
        </div>
        <div className="nav-diff">
        <button 
            style={activeButton === 1 ? { backgroundColor: '#FBCDD4', color: 'white' } : {} }
            onClick={() => handleButtonClick(1)}>
            🔥인기
          </button>
          <button 
            style={activeButton === 2 ? { backgroundColor: '#FBCDD4', color: 'white' } : {}}
            onClick={() => handleButtonClick(2)}>
            #키워드
          </button>
          <button 
            style={activeButton === 3 ? { backgroundColor: '#FBCDD4', color: 'white'} : {}}
            onClick={() => handleButtonClick(3)}>
            테마
          </button>
        </div>
        <Keywords activeButton={activeButton} />
      </div>
      
    </div>
  )
}

export default Keyword
