import { apiClient } from '@/shared/api/apiClient';
import endpoints from '@/shared/api/endpoints';
import type { AuthResponse, LoginCredentials } from '@/auth/stores/authTypes';

export const loginApi = async (credentials: LoginCredentials) => {
  const response = await apiClient.post<AuthResponse>(endpoints.auth.login, credentials);
  return response.data;
};
export const loginWithToken = async ({ token }: { token: string }) => {
  const response = await apiClient.post<AuthResponse>(
    endpoints.auth.login,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const logoutApi = async () => {
  const response = await apiClient.post<AuthResponse>(endpoints.auth.logout);
  return response.data;
};
