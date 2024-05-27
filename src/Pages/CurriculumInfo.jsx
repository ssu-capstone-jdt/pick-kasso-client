import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Components/api';

const CurriculumInfo = () => {
  const { id } = useParams();
  const [curriculum, setCurriculum] = useState(null);
  const [isChromeRuntimeAvailable, setIsChromeRuntimeAvailable] = useState(false);

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
      //react app이 확장 프로그램으로 실행되는 것이 아니면 무조건 false이기 때문에 이거 크게 바꾸거나 해야 할거 같다
    }
  }, []);

  const startTimer = () => {
    if (isChromeRuntimeAvailable) {
      // Send a message to the content script
      window.postMessage({ type: 'START_TIMER' }, '*');
    } else {
      console.log('Chrome runtime not available');
    }
  };

  if (!curriculum) {
    return <div>Loading...</div>;
  }

  return (
    <div className="local-curriculum">{/* css 수정 할 때 여기 LocalCurr css랑 연결됨 주의 */}
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
          <button onClick={startTimer}disabled={!isChromeRuntimeAvailable}>
        타이머
      </button>
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
