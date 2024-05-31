import React from 'react';

export function GoogleAuthButton({ handleLogin }) {
  return <button onClick={handleLogin}>로그인</button>;
}

export default GoogleAuthButton;
