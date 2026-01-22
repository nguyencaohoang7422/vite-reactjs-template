import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginRequest: (state, _action: PayloadAction<{ username: string; password: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; rememberMe: boolean }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: () => {},
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, checkAuth, loginFailure, logout, clearAuth } = authSlice.actions;

export default authSlice.reducer;
