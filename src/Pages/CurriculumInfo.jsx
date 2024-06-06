import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Components/api';
import curriculums_1 from '../Components/Assets/curriculums_1.jpg';
import curriculums_2 from '../Components/Assets/curriculums_2.jpg';
import curriculums_3 from '../Components/Assets/curriculums_3.jpg';
import curriculums_4 from '../Components/Assets/curriculums_4.jpg';
import curriculums_5 from '../Components/Assets/curriculums_5.jpg';
import curriculums_6 from '../Components/Assets/curriculums_6.jpg';
import curriculums_7 from '../Components/Assets/curriculums_7.jpg';
import curriculums_8 from '../Components/Assets/curriculums_8.jpg';
import curriculums_9 from '../Components/Assets/curriculums_9.jpg';
import curriculums_10 from '../Components/Assets/curriculums_10.jpg';
import FileUploadButton from '../Components/FileUploadButton/FileUploadButton';
import play_ICON from '../Components/Assets/play_ICON.png'
import done_ICON from '../Components/Assets/done_ICON.png';
import './CurriculumInfo.css'

const CurriculumInfo = () => {
  const { id } = useParams();
  const [curriculum, setCurriculum] = useState(null);
  const [isChromeRuntimeAvailable, setIsChromeRuntimeAvailable] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);

  const imageMap = {
    1: curriculums_1,
    2: curriculums_2,
    3: curriculums_3,
    4: curriculums_4,
    5: curriculums_5,
    6: curriculums_6,
    7: curriculums_7,
    8: curriculums_8,
    9: curriculums_9,
    10: curriculums_10,
  };

  const getImageById = (id) => {
    return imageMap[id] || curriculums_1;
  };

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    alert('타이머 준비 완료');
  };

  useEffect(() => {
    api.get(`/curriculums/${id}`)
      .then(response => {
        console.log('API Response:', response.data);
        setCurriculum(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch curriculum:', error);
      });
  }, [id]);

  useEffect(() => {
    if (window.chrome && window.chrome.runtime) {
      setIsChromeRuntimeAvailable(true);
    } else {
      // 개발 환경에서 테스트하기 위해 강제로 true로 설정
      setIsChromeRuntimeAvailable(true);
      // react app이 확장 프로그램으로 실행되는 것이 아니면 무조건 false이기 때문에 이거 크게 바꾸거나 해야 할거 같다
    }
  }, []);

  if (!curriculum) {
    return <div>Loading...</div>;
  }
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  const explanations = curriculum.curriculum_response.curriculum_explanation
    .split('.')
    .filter(sentence => sentence.trim().length > 0);

  return (
    <div className="local-curriculum">
      <img 
        className='local-curriculum-img' 
        src={curriculum.curriculum_response.curriculum_painting || getImageById(curriculum.curriculum_response.curriculum_id)}
        alt={curriculum.curriculum_response.curriculum_title}   
      />
      <div className="local-curr-h1">
        <h1>{curriculum.curriculum_response.curriculum_title}</h1>
        <p>{curriculum.curriculum_response.curriculum_info}</p>
      </div>
      <div className="local-curr-info">
        {explanations.map((explanation, index) => (
          <p key={index}>{explanation.trim()}.</p>
        ))}
      </div>
      <div className="rounds">
      {(curriculum.download_round_response || []).map((round, index) => (
          <div key={index} className="round">
            <h3>{round.order}</h3>
            <p>{formatTime(round.time)}</p>
            {round.is_upload_successful === "True" && (
              <>
                <div className="done-overlay">
                  <img src={done_ICON} alt="Done Icon" className="done-icon" />
                </div>
              </>
            )}
            <button 
              id={activeButtonIndex === index ? 'invoice_no_1' : 'invoice'}
              value={round.time} 
              onClick={() => handleButtonClick(index)} 
              disabled={!isChromeRuntimeAvailable}
              className="open-modal-button-up" 
              data-explanation={round.explanation}>
              <img src={play_ICON} alt="Upload Icon" className="upload_ICON" />
            </button>
            <FileUploadButton 
              id={activeButtonIndex === index ? 'invoice_no_2' : 'invoice_no_3'} 
              roundId={round.id} 
              disabled={!(activeButtonIndex === index)}
            />
            {!isChromeRuntimeAvailable && (
              <p style={{ color: 'red' }}>
                Timer functionality is only available in the Chrome extension.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurriculumInfo;
