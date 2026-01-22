import type { RootState } from '@/configs';
import { createDraftSafeSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit';

const createWeakMapDraftSafeSelector = createDraftSafeSelectorCreator(weakMapMemoize);

const selectSelf = (state: RootState) => state;
export const selectApp = createWeakMapDraftSafeSelector(selectSelf, (state) => state.app);
