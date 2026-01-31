import { router } from '@/app/router';
import { apiClient } from '@/shared/api/apiClient';
import endpoints from '@/shared/api/endpoints';
import { apiBaseUrl } from '@/shared/constants/config';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { toast } from 'sonner';

export function* navigate(path: string, option?: any) {
  yield router.navigate(path, option);
}
export function errorHelper(error: any, isToast: boolean = true) {
  if (error instanceof Error) {
    if (isToast) {
      toast.error(error.message);
    }
    console.error(error.message);
  } else {
    console.error('Unknown error', error);
  }
}
export type ActionWithResolver<T = any> = PayloadAction<T> & {
  resolver?: {
    resolve: (value: any) => void;
    reject: (error: any) => void;
  };
};
export function* uploadFile(file: File): SagaIterator {
  try {
    if (!file) throw new Error('No file updated');
    const formData = new FormData();
    formData.append('image', file);
    const newConfig = {
      skipAuthorization: false,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = yield call(apiClient.post, endpoints.file.upload, newConfig);
    if (response?.success) {
      return `${apiBaseUrl}${response?.result[0]?.filePath}`;
    }
    return '';
  } catch (error) {
    console.error(error);
    return '';
  }
}
