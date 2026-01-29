import type { PayloadAction } from '@reduxjs/toolkit';
import { clsx, type ClassValue } from 'clsx';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const useDispatchResolve = () => {
  const dispatch = useDispatch();
  return useCallback(
    (action: PayloadAction) => {
      return new Promise((resolve, reject) => {
        const newAction = { ...action, resolver: { resolve, reject } };
        dispatch(newAction);
      });
    },
    [dispatch],
  );
};
