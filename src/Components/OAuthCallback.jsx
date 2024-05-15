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
    // Only make the request if an authCode is available and we are not already requesting.
    if (authCode && !isRequesting) {
      setIsRequesting(true);
      console.log("Sending auth code to server: ", authCode);

      axios.post('http://localhost:8080/auth/code', { code: authCode })
        .then(response => {
          // Store access and refresh tokens in cookies
          Cookies.set('access_token', response.data.data.access_token);
          Cookies.set('refresh_token', response.data.data.refresh_token);

          // Redirect to home after successful login
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
  }, [authCode, isRequesting]); // Add isRequesting to dependency array.

  return null; // Return null or some JSX if needed.
}

export default OAuthCallback;
