import React from 'react';

const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=914974225921-qkl53ra0h3nfotk5nsusarb8gh0c68vj.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&access_type=offline&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow';

export function GoogleAuthButton({ setUser }) {
  const handleLogin = () => {
    console.log("Login button clicked, redirecting to Google:");
    window.location.href = GOOGLE_OAUTH_URL;
  };

  return <button onClick={handleLogin}>로그인</button>;
}

export default GoogleAuthButton;
