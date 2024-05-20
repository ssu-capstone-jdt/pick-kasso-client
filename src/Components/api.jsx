import axios from 'axios';
import Cookies from 'js-cookie';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true // 쿠키를 사용하기 위해 필요
});

// 요청 인터셉터를 추가하여 모든 요청에 헤더를 자동으로 추가
api.interceptors.request.use(config => {
  // 쿠키에서 액세스 토큰과 리프레시 토큰 가져오기
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  // 헤더에 Cookie 추가
  if (accessToken && refreshToken) {
    config.headers.Cookie = `access_token=${accessToken}; refresh_token=${refreshToken}`;
  }

  return config;
}, error => {
  // 요청 에러 처리
  return Promise.reject(error);
});

// 나머지 애플리케이션에서는 이 api 인스턴스 사용
export default api;
