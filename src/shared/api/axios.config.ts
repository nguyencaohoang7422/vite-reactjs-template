import { logout } from '@/auth/stores/authSlice';
import { store } from '@/configs';
import { apiBaseUrl, cookieName } from '@/shared/constants/config';
import axios from 'axios';
import { getValue } from '../libs';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
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
