import type { AuthState, User } from '@/auth';
import { removeValue, setValue } from '@/shared';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const moduleName = 'auth';
export const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginRequest: (state, _action: PayloadAction<{ username: string; password: string; redirectTo: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; rememberMe: boolean }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      setValue(action.payload.token);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: () => {},
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      removeValue();
    },
  },
});

export const { loginRequest, setLoading, loginSuccess, checkAuth, loginFailure, logout, clearAuth } = authSlice.actions;

export default authSlice.reducer;
