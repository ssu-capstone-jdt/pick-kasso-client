import React, { useEffect } from 'react';
import axios from 'axios';

function OAuthCallback({ setUser }) {
  useEffect(() => {
    console.log("OAuthCallback component mounted.");
    
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code'); 

    console.log("Extracted Auth Code: ", authCode);

    if (authCode) {
      console.log("서버로 인증 코드 전송: ", authCode);

      // 서버에 인증 코드를 POST로 전송하여 액세스 토큰 교환
      axios.post('http://localhost:8080/auth/code', { code: authCode })
        .then(response => {
          // 성공적으로 응답 받은 경우, 사용자 정보 설정
          const { name, picture } = response.data;
          setUser({ name, picture });
          console.log("사용자 정보 설정 완료: ", response.data);

          // 홈 페이지로 리다이렉트
          window.location.href = '/home';
        })
        .catch(error => {
          console.error("인증 코드 처리 중 오류 발생: ", error);
          alert('로그인에 실패했습니다.');
        });
    }
  }, [setUser]);

  return <div>로그인 처리 중...</div>;
}

export default OAuthCallback;
