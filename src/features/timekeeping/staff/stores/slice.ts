import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StaffFormData } from '../schemas/index.ts';
import type { PaginationPayload, Shift, Staff, State } from './type.ts';

export const moduleName = 'timekeeping-staff';
export const initialState: State = {
  list: [],
  isLoading: false,
  limit: 10,
  page: 1,
  total: 0,
  error: null,
  shiftList: [],
};
const slice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    pagination: (state, _action: PayloadAction<PaginationPayload>) => {
      state.isLoading = true;
    },
    setStaffData: (state, action: PayloadAction<{ list: Staff[]; page: number; limit: number; total: number }>) => {
      state.page = action.payload.page;
      state.list = [...action.payload.list];
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },
    findTimekeepingShift: () => {},
    setTimekeepingShift: (state, action: PayloadAction<{ list: Shift[] }>) => {
      state.shiftList = action.payload.list;
    },
    insert: (_state, _action: PayloadAction<StaffFormData>) => {},
    delete: () => {},
    update: () => {},
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { pagination, insert, update, setStaffData, setLoading, setTimekeepingShift, findTimekeepingShift } =
  slice.actions;

export default slice.reducer;
