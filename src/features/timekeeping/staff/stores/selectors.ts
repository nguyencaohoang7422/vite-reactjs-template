import type { RootState } from '@/configs';
import { createSelector } from '@reduxjs/toolkit';
import { initialState, moduleName } from './slice';
import type { State } from './type';

export const makeSelectDomain = (state: any): State => state[moduleName as keyof RootState] || initialState;
export const selectStaffState = (key?: keyof State) =>
  createSelector(makeSelectDomain, (state) => (key ? state[key] : state));
