import { getValue, removeValue, setValue } from '@/shared/libs/cookie';
import type { PayloadAction } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { type SagaIterator } from 'redux-saga';
import { all, call, put, putResolve, takeLatest, takeLeading } from 'redux-saga/effects';
import { toast } from 'sonner';
import { loginApi, loginWithToken, logoutApi } from '../api/authApi';
import { checkAuth, clearAuth, loginFailure, loginRequest, loginSuccess, logout } from '@/auth';
import { navigate } from '@/app/services';

function getDeviceId() {
  const deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    const newDeviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', newDeviceId);
    return newDeviceId;
  }
  return deviceId;
}

export function* checkAuthSaga(): SagaIterator {
  try {
    const token = getValue();
    if (token) {
      const response = yield call(loginWithToken, { token });
      if (response.success) {
        yield putResolve(loginSuccess({ token: response.result.token, user: response.result, rememberMe: true }));
      } else {
        toast.error(response.message);
      }
    } else {
      yield put(loginFailure('No token found'));
      navigate('/login');
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
    console.error(error);
    navigate('/login');
  }
}

export function* loginSaga(action: PayloadAction<{ username: string; password: string }>): any {
  try {
    const userAgent = globalThis.navigator.userAgent;
    const deviceId = getDeviceId();
    const response = yield call(loginApi, { ...action.payload, deviceId, deviceName: userAgent });
    if (response.success) {
      yield putResolve(loginSuccess({ token: response.result.token, user: response.result, rememberMe: true }));
      setValue(response.result.token);
      navigate('/');
      toast.success('Đăng nhập thành công');
    } else {
      toast.error(response?.message);
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
    if (error.message) {
      toast.error(error.message);
    }
  }
}

export function* logoutSaga(): any {
  try {
    const response = yield call(logoutApi);
    if (response.success) {
      yield putResolve(clearAuth());
      removeValue();
      redirect('/login');
      toast.success('Đăng xuất thành công');
    } else {
      toast.error(response.message);
    }
  } catch (error: any) {
    if (error?.message) {
      toast.error(error.message);
    }
  }
}

export default function* authSaga(): SagaIterator {
  yield all([
    takeLatest(checkAuth.type, checkAuthSaga),
    takeLeading(loginRequest.type, loginSaga),
    takeLeading(logout.type, logoutSaga),
  ]);
}
