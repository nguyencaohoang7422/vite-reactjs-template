import type { RootState } from '@/configs';
import { createDraftSafeSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit';

const createWeakMapDraftSafeSelector = createDraftSafeSelectorCreator(weakMapMemoize);

const selectSelf = (state: RootState) => state;
export const selectAuthState = (key?: string) =>
  createWeakMapDraftSafeSelector(selectSelf, (state) => (key ? state.auth[key] : state.auth));
