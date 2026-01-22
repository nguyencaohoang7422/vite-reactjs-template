import { createSelector } from '@reduxjs/toolkit';
import { initialState, moduleName } from './slice.ts';
import type { State } from '@/features/account-managers';
import type { RootState } from '@/configs';

export const makeSelectDomain = (state: any): State => state[moduleName as keyof RootState] || initialState;
export const selectStateByKey = (key?: keyof State) =>
  createSelector(makeSelectDomain, (state) => (key ? state[key] : state));
