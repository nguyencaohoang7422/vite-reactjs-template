import { createSelector } from '@reduxjs/toolkit';
import type { AuthState } from '@/auth';
import { initialState, moduleName } from '@/auth';
import type { RootState } from '@/configs';

export const makeSelectDomain = (state: any): AuthState => state[moduleName as keyof RootState] || initialState;
export const selectAuthState = (key?: keyof AuthState) =>
  createSelector(makeSelectDomain, (state) => (key ? state[key] : state));
