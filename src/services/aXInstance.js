import axios from 'axios';

// Base URL is taken from Vite env var `VITE_API_BASE_URL` when available,
// otherwise falls back to the local development URL.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7104/api';

const instance = axios.create({ baseURL });

// Attach token from localStorage to every request if present.
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
