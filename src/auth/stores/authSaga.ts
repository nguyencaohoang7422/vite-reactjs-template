import { isRouteExist } from '@/app/router';
import { navigate } from '@/app/services';
import { checkAuth, clearAuth, loginFailure, loginRequest, loginSuccess, logout, setLoading } from '@/auth';
import { PATH_ROUTING } from '@/shared';
import { getValue } from '@/shared/libs/cookie';
import type { PayloadAction } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { type SagaIterator } from 'redux-saga';
import { all, call, put, putResolve, takeLatest, takeLeading } from 'redux-saga/effects';
import { toast } from 'sonner';
import { loginApi, loginWithToken, logoutApi } from '../api/authApi';

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
    navigate('/login');
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginSaga(
  action: PayloadAction<{ username: string; password: string; redirectTo: string }>,
): SagaIterator {
  const { redirectTo, username, password } = action.payload;
  try {
    const deviceName = globalThis.navigator.userAgent;
    const deviceId = getDeviceId();
    const response = yield call(loginApi, { username, password, deviceId, deviceName });
    if (response?.success) {
      yield putResolve(loginSuccess({ token: response.result.token, user: response.result, rememberMe: true }));
      if (isRouteExist(redirectTo)) {
        navigate(redirectTo, { replace: true });
      } else {
        navigate('/');
      }
      toast.success('Đăng nhập thành công');
    } else {
      toast.error(response?.message);
    }
  } catch (error: any) {
    yield put(loginFailure(error?.message));
    if (error?.message) {
      toast.error(error?.message);
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* logoutSaga(): any {
  try {
    const response = yield call(logoutApi);
    if (response.success) {
      yield putResolve(clearAuth());
      redirect(PATH_ROUTING.LOGIN);
      toast.success('Đăng xuất thành công');
    } else {
      toast.error(response?.message);
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
