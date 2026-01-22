import type { IModule } from '@/configs/reducerManager';
import authSaga from './authSaga';
import authReducer, { checkAuth } from './authSlice.ts';
import type { AuthState } from '@/auth';

export function getAuthModule(): IModule<AuthState> {
  return {
    id: 'auth',
    reducerMap: {
      ['auth']: authReducer,
    },
    initialActions: [checkAuth()],
    sagas: [authSaga],
  };
}
