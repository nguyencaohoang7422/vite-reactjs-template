import { navigate } from '@/app/store/appSlice';
import { cookieName } from '@/shared';
import { getValue, setValue } from '@/shared/lib/cookie';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type SagaIterator } from 'redux-saga';
import { call, put, putResolve, takeLatest, takeLeading } from 'redux-saga/effects';
import { toast } from 'sonner';
import { loginApi, loginWithToken, logoutApi } from '../api/authApi';
import { checkAuth, loginFailure, loginRequest, loginSuccess, logout } from './authSlice';
 function getDeviceId(){
  const deviceId = localStorage.getItem('deviceId');
  if(!deviceId){
    const newDeviceId = crypto.randomUUID();
    localStorage.setItem('deviceId',newDeviceId)
    return newDeviceId;
  }
  return deviceId;
}
 function* checkAuthSaga(): SagaIterator{
  try {
    const token = getValue('vCloudWeb');
    if(token){
      const response = yield call(loginWithToken, {token});
      if(response.success){
         yield putResolve(loginSuccess({token: response.result.token , user: response.result,rememberMe: true }));
         return;
      }
      throw new Error('Phiên đăng nhập hết hạn');
    }
   throw new Error('Phiên đăng nhập hết hạn');
  } catch (error : any) {
    console.error(error);
    error?.message  && toast.error(error?.message);
    yield put(navigate('/login'));
  }
}
export function* loginSaga(action: PayloadAction<{ username: string; password: string, }>):any {
  try {
    const userAgent = globalThis.navigator.userAgent;
    const deviceId = getDeviceId();
    const response = yield call(loginApi, {...action.payload,deviceId:deviceId,deviceName:userAgent});
    if(response.success){
      yield putResolve(loginSuccess({token: response.result.token , user: response.result,rememberMe: true }));
      setValue(cookieName,response.result.token);
      yield put(navigate('/'))
      toast.success('Đăng nhập thành công');
    }else{
      toast.error(response.message);
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
    error?.message  && toast.error(error?.message);
  }
}
export function* logoutSaga():any {
  try {
    const response = yield call(logoutApi);
    if(response.success){
      yield put(navigate('/login'))
      toast.success('Đăng xuất thành công');
    }else{
      toast.error(response?.message)
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
    error?.message  && toast.error(error?.message);

  }
}

export default function* authSaga() {
   yield takeLatest(checkAuth.type, checkAuthSaga);
   yield takeLeading(loginRequest.type, loginSaga);
   yield takeLeading(logout.type, logoutSaga);
}
