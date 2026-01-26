import { createSelector } from '@reduxjs/toolkit';
import { type AppState, initialState, moduleName } from './appSlice';
import type { RootState } from '@/configs';

export const makeSelectDomain = (state: any): AppState => state[moduleName as keyof RootState] || initialState;
export const selectStateByKey = (key?: keyof AppState) =>
  createSelector(makeSelectDomain, (state) => (key ? state[key] : state));
