import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeState } from './appType';

export type AppState = {
  theme: ThemeState;
};

const initialState: AppState = {
  theme: 'default',
};

const authSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = authSlice.actions;
export default authSlice.reducer;
