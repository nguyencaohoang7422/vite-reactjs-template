import type { AuthResponse } from '@/auth/stores/authTypes';
import axiosInstance from './axios.config';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type Strategy = {
  [K in HttpMethod]: <T = AuthResponse>(url: string, ...args: any[]) => Promise<T>;
};

const strategy: Strategy = {
  get: async <T>(url: string, config?: any) => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },
  post: async <T>(url: string, data?: any, config?: any) => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },
  put: async <T>(url: string, data?: any, config?: any) => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },
  delete: async <T>(url: string, config?: any) => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
  patch: async <T>(url: string, data?: any, config?: any) => {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },
};

export const apiClient = strategy;
