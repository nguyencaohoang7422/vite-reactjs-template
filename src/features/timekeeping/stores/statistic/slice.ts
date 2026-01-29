import { createSlice } from '@reduxjs/toolkit';
import type { State } from '@/features/account-managers/stores/type.ts';

export const moduleName = 'timekeeping';
const initialState: State = {
  list: [],
  isLoading: false,
  error: null,
};
const slice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const { loading } = slice.actions;

export default slice.reducer;
