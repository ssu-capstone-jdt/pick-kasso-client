import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GoogleAuthButton() {
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authcode = urlParams.get('code');
    if (authcode) {
      // URL에서 인증 코드 추출
      setAuthCode(authcode);
      // 서버로 인증 코드 전송
      axios.post('http://localhost:8080/auth/code', { code : authcode })
        .then(response => {
          // 사용자 정보 처리
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []);

  const handleButtonClick = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=914974225921-qkl53ra0h3nfotk5nsusarb8gh0c68vj.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&access_type=offline&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow';
  };

  return (
    <div>
      {!authCode && (
        <button onClick={handleButtonClick}>
          로그인
        </button>
      )}
      {authCode && (
        <p>인증 코드: {authCode}</p>
        // 여기서 인증 코드를 서버로 전달하여 사용자 정보를 가져오는 API 호출을 수행할 수 있습니다.
      )}
    </div>
  );
}

export default GoogleAuthButton;
