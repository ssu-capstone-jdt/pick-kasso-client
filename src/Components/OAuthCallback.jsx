import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function OAuthCallback({ setUser }) {
    const [isRequesting, setIsRequesting] = useState(false);
    const [authCode, setAuthCode] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        setAuthCode(code);
    }, []);

    useEffect(() => {
        if (authCode && !isRequesting) {
            setIsRequesting(true);
            axios.post('http://localhost:8080/auth/code', { code: authCode })
                .then(response => {
                    const { access_token, refresh_token, nickname, profile } = response.data.data;

                    Cookies.set('access_token', access_token);
                    Cookies.set('refresh_token', refresh_token);

                    const userData = { nickname, profile };
                    sessionStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);

                    window.location.href = '/home';
                })
                .catch(error => {
                    console.error("Error processing auth code: ", error);
                    alert('Login failed.');
                })
                .finally(() => {
                    setIsRequesting(false);
                });
        }
    }, [authCode, isRequesting, setUser]);

    return null;
}

export default OAuthCallback;
