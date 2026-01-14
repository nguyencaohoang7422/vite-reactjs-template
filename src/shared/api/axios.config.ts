import { store } from '@/configs';
import { logout } from '@/features/auth/store/authSlice';
import axios from 'axios';
export const appToken = 'vCloudWeb'

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
    const tokenFromCookie = await cookieStore.get(appToken);
    const token = store.getState().auth.token || tokenFromCookie;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
     store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
