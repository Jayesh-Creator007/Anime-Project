import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token to requests
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  verifyOtp: (data) => API.post('/auth/verify-otp', data),
  login: (data) => API.post('/auth/login', data),
};

export const animeAPI = {
  getAll: () => API.get('/anime'),
  getById: (id) => API.get(`/anime/${id}`),
  getStats: () => API.get('/anime/stats'),
  create: (data) => API.post('/anime', data),
  update: (id, data) => API.put(`/anime/${id}`, data),
  delete: (id) => API.delete(`/anime/${id}`),
  like: (id) => API.patch(`/anime/${id}/like`),
};

export default API;
