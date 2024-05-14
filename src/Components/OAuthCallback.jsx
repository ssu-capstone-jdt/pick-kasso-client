import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // js-cookie import

function OAuthCallback({ setUser }) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [authCode, setAuthCode] = useState(null); // authCode를 상태로 관리

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); 
    setAuthCode(code); // URL에서 가져온 authCode를 상태로 설정
  }, []); // 컴포넌트가 마운트될 때만 실행

  useEffect(() => {

    if (authCode && !isRequesting) {
      setIsRequesting(true);
      console.log("서버로 인증 코드 전송: ", authCode);

      axios.post('http://localhost:8080/auth/code', { code: authCode })
        .then(response => {
        // 액세스 토큰과 리프레시 토큰을 쿠키에 저장
          Cookies.set('access_token', response.data.data.access_token);
          Cookies.set('refresh_token', response.data.data.refresh_token);

          window.location.href = '/home';
        })
        .catch(error => {
          console.error("인증 코드 처리 중 오류 발생: ", error);
          alert('로그인에 실패했습니다.');
        })
        .finally(() => {
          setIsRequesting(false);
        });
    }
  }, [authCode]); // 의존성 배열에 authCode 추가
}

export default OAuthCallback;
