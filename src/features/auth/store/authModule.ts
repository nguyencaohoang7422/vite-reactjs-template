import type { IModule } from '@/configs/reducerManager';
import authSaga from './authSaga';
import authReducer, { checkAuth } from './authSlice';
import type { AuthState } from './authTypes';

export interface IAuthState {
  auth: AuthState;
}

export function getAuthModule(): IModule<IAuthState> {
  return {
    id:'auth',
    reducerMap: {
       auth: authReducer,
    },
    initialActions : [checkAuth()],
    sagas: [authSaga],
  };
}
