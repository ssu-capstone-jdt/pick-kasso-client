import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    api.get(`/curriculums/${id}`)
      .then(response => {
        setCurriculum(response.data.data);
        setError(false);
      })
      .catch(error => {
        console.error('Error fetching curriculum data:', error);
        setError(true);
      });
  }, [id]);

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

  const handleDownload = () => {
    api.post(`/curriculums/${id}`)
      .then(response => {
        console.log('Curriculum downloaded successfully:', response);
        navigate(`/curriculuminfo/${id}`);
      })
      .catch(error => {
        console.error('Error downloading curriculum:', error);
      });
  };

  if (error) {
    return <p>Error loading data!</p>;
  }

  if (!curriculum) {
    return <p>Loading...</p>;
  }

  return (
    <div className="local-curriculum">
      <h1>{curriculum.curriculum_response.curriculum_title}</h1>
      <p>{curriculum.curriculum_response.curriculum_info}</p>
      <img src={curriculum.curriculum_response.curriculum_painting || getImageById(curriculum.curriculum_response.curriculum_id)}
           alt={curriculum.curriculum_response.curriculum_title}   
      />
      <p>Number of Rounds: {curriculum.curriculum_response.curriculum_round_count}</p>
      <p>Difficulty: {curriculum.curriculum_response.curriculum_difficulty}</p>
      <p>Explanation: {curriculum.curriculum_response.curriculum_explanation}</p>
      <div className="rounds">
        {(curriculum.download_round_response || []).map((round, index) => (
          <div key={index} className="round">
            <h3>Round {round.order}</h3>
            <p>Time: {round.time} seconds</p>
            <p>Explanation: {round.explanation}</p>
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
