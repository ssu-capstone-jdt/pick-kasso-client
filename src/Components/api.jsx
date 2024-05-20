import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true // 쿠키를 사용하기 위해 필요
});

// 나머지 애플리케이션에서는 이 api 인스턴스 사용
export default api;
