import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Components/api';
import './LocalCurr.css';
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

const LocalCurr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [error, setError] = useState(false);

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

  const loadLocalData = useCallback(async () => {
    try {
      const response = await fetch(`/localCurriculum_${id}.json`);
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      const localData = await response.json();
      console.log('Local data loaded:', localData);
      setCurriculum(localData.data);
    } catch (localError) {
      console.error('Error loading local data:', localError);
      setError(true);
    }
  }, [id]);

  useEffect(() => {
    api.get(`/curriculums/${id}`)
      .then(response => {
        setCurriculum(response.data.data);
        setError(false);
      })
      .catch(error => {
        console.error('Error fetching curriculum data:', error);
        loadLocalData();
      });
  }, [id, loadLocalData]);

  const handleDownload = () => {
    api.post(`/curriculums/${id}`)
      .then(response => {
        console.log('Curriculum downloaded successfully:', response);
        navigate(`/curriculuminfo/${id}`);
      })
      .catch(error => {
        console.error('Error downloading curriculum:', error);
        alert("로그인 후 이용 가능합니다.")
      });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (error) {
    return <p>Error loading data!</p>;
  }

  if (!curriculum) {
    return <p>Loading...</p>;
  }

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
          </div>
        ))}
      </div>
      <div className="overlay-bar">
        <div className="overlay-content">
          <p><b>다운로드 후 이용이 가능합니다!</b></p>
          <p>다운로드한 커리큘럼은 나의 보관함에 추가/삭제 가능합니다.</p>
        </div>
        <button className="download-button" onClick={handleDownload}><b>다운로드</b></button>
      </div>
    </div>
  );
};

export default LocalCurr;
