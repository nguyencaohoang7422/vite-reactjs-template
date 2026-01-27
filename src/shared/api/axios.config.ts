import { logout } from '@/auth/stores/authSlice';
import { store } from '@/configs';
import { cookieName } from '@/shared';
import axios from 'axios';
import { getValue } from '../libs';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenFromCookie = getValue(cookieName);
    const token = (store.getState() as { auth: { token?: string } }).auth.token || tokenFromCookie;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error.response.data),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      store.dispatch(logout());
    }
    return Promise.reject(error.response?.data || error.response);
  },
);

export default axiosInstance;
