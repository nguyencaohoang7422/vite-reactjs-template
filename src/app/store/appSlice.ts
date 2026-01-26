import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SocketState, ThemeState } from './appType';

export type AppState = {
  theme: ThemeState;
  mainSocket: SocketState;
  pluginSocket: SocketState;
};
export const moduleName = 'app';
export const initialState: AppState = {
  theme: 'default',
  mainSocket: {
    initialized: false,
    connected: false,
  },
  pluginSocket: {
    initialized: false,
    connected: false,
  },
};
export type SocketType = Extract<keyof AppState, 'mainSocket' | 'pluginSocket'>;
const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      state.theme = action.payload;
    },
    initSocket: (state, _action: PayloadAction<{ url: string; type: SocketType }>) => {
      state[_action.payload.type].initialized = true;
    },
    socketConnected: (state, _action: PayloadAction<{ type: SocketType }>) => {
      state[_action.payload.type].connected = true;
    },
    socketDisconnected: (state, _action: PayloadAction<{ type: SocketType }>) => {
      state[_action.payload.type].connected = false;
    },
    cleanupSocket: (state, _action: PayloadAction<{ type: SocketType }>) => {
      state[_action.payload.type].connected = false;
      state[_action.payload.type].initialized = false;
    },
  },
});

export const { setTheme, initSocket, socketDisconnected, cleanupSocket, socketConnected } = authSlice.actions;
export default authSlice.reducer;
