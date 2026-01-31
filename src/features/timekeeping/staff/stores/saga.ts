import { errorHelper, type ActionWithResolver } from '@/app/services';
import { apiClient } from '@/shared';
import endpoints from '@/shared/api/endpoints';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { toast } from 'sonner';
import { findTimekeepingShift, insert, pagination, setLoading, setStaffData, setTimekeepingShift } from './slice';
import type { PaginationPayload } from './type';

function* paginationSaga(action: PayloadAction<PaginationPayload>): SagaIterator {
  const { payload } = action;
  try {
    const response = yield call(apiClient.post, endpoints.timekeeping.staff.pagination, payload);
    if (response?.success) {
      const { limit, page, list, total } = response.result;
      yield put(setStaffData({ limit, list, page, total }));
    }
  } catch (error) {
    errorHelper(error);
  } finally {
    yield put(setLoading(false));
  }
}
function* insertSaga(action: ActionWithResolver): SagaIterator {
  const { payload, resolver } = action;
  try {
    const response = yield call(apiClient.post, endpoints.timekeeping.staff.insert, payload);
    if (response?.success) {
      toast.success('Add user success');
    }
    resolver?.resolve(response);
  } catch (error) {
    errorHelper(error);
  }
}
function* findShiftSaga(): SagaIterator {
  try {
    const response = yield call(apiClient.post, endpoints.timekeeping.shift.find);
    if (response?.success) {
      const list = response?.result;
      yield put(setTimekeepingShift({ list }));
    }
  } catch (error) {
    errorHelper(error);
  }
}
export default function* saga(): SagaIterator {
  yield all([
    takeLeading(pagination.type, paginationSaga),
    takeLeading(insert.type, insertSaga),
    takeLatest(findTimekeepingShift.type, findShiftSaga),
  ]);
}
