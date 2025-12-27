import axios from 'axios';

// Set base URL for API calls
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : 'http://localhost:5000';

axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor to include auth token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;