import axios from 'axios';

// runtime override -> Vite env -> fallback
const runtimeBase = window.__APP_ENV__?.VITE_API_BASE_URL;
const baseURL = runtimeBase || import.meta.env.VITE_API_BASE_URL || 'https://localhost:7104/api';

console.log('AxInstance baseURL:', baseURL);

const instance = axios.create({ baseURL });

// Attach token from localStorage to every request if present.
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`Attached token to request headers ${config.headers.Authorization}`);
  }
  return config;
});

export default instance;
