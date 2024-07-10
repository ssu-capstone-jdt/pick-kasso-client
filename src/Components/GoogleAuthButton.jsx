import React from 'react';

export function GoogleAuthButton({ handleLogin }) {
  return <button onClick={handleLogin} style={{ whiteSpace: 'nowrap' }} >로그인</button>;
}

export default GoogleAuthButton;
