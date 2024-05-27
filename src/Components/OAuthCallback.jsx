import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // js-cookie import

function OAuthCallback({ setUser }) {
    const [isRequesting, setIsRequesting] = useState(false);
    const [authCode, setAuthCode] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        setAuthCode(code);
    }, []); // This effect does not need dependencies as it only runs on mount.

    useEffect(() => {
        if (authCode && !isRequesting) {
            setIsRequesting(true);
            axios.post('http://localhost:8080/auth/code', { code: authCode })
                .then(response => {
                    Cookies.set('access_token', response.data.data.access_token);
                    Cookies.set('refresh_token', response.data.data.refresh_token);
                    
                    // Assuming response.data.data contains user info
                    const userData = {
                        nickname: response.data.data.nickname,
                        profile: response.data.data.profile
                    };
                    console.log("User Data:", userData); // Debugging
                    sessionStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);

                    window.location.href = '/home';
                    setAuthCode(null); // 인증 코드 사용 후 초기화
                })
                .catch(error => {
                    console.error("Error processing auth code: ", error);
                    alert('Login failed.');
                })
                .finally(() => {
                    setIsRequesting(false);
                });
        }
    }, [authCode, isRequesting, setUser]); // 의존성 배열에 isRequesting 추가

    return null; // Return null or some JSX if needed.
}

export default OAuthCallback;
