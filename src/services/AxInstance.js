import axios from 'axios';

// runtime/build/dev defaults
const runtimeBase = window.__APP_ENV__?.VITE_API_BASE_URL;
const buildBase   = import.meta.env.VITE_API_BASE_URL;
const devDefault  = 'https://localhost:7104/api';

// run detection explicitly
const isDev = Boolean(import.meta.env.DEV);
const isLocalHost = (() => {
  const h = window.location.hostname;
  console.log('Current hostname:', h);
  return h === 'localhost' || h === '127.0.0.1' || h === '';
})();

// now resolve clearly: prefer local/dev when running locally/dev -> runtime override -> build-time value -> final fallback
let baseURL;
if (isDev || isLocalHost) {
  baseURL = devDefault;
} else if (runtimeBase) {
  baseURL = runtimeBase;
} else if (buildBase) {
  baseURL = buildBase;
} else {
  baseURL = 'https://localhost:7104/api';
}

console.log('AxInstance baseURL resolved to:', baseURL);

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
