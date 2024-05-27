import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Components/api';
import './LocalCurr.css';

const LocalCurr = () => {
  const { id } = useParams();
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

  const handleDownload = () => {
    api.post(`/curriculums/${id}`)
      .then(response => {
        console.log('Curriculum downloaded successfully:', response);
        // Handle the response as needed
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
      <img src={curriculum.curriculum_response.curriculum_background} alt="Background" />
      <p>Number of Rounds: {curriculum.curriculum_response.curriculum_round_count}</p>
      <p>Difficulty: {curriculum.curriculum_response.curriculum_difficulty}</p>
      <p>Explanation: {curriculum.curriculum_response.curriculum_explanation}</p>
      <div className="rounds">
        {curriculum.round_response.map((round, index) => (
          <div key={index} className="round">
            <h3>Round {round.order}</h3>
            <p>Time: {round.time} minutes</p>
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
