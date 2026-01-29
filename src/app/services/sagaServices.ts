import { router } from '@/app/router';
import type { PayloadAction } from '@reduxjs/toolkit';
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
