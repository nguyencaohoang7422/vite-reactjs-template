import { useCallback } from 'react';

// Tạo một event emitter đơn giản để quản lý dialog toàn cục
const dialogEventKey = '__GLOBAL_DIALOG_EVENT__';

type DialogEvent = {
  type: 'show' | 'hide';
  payload?: any;
};

export function showDialog(payload?: any) {
  globalThis.dispatchEvent(new CustomEvent<DialogEvent>(dialogEventKey, { detail: { type: 'show', payload } }));
}

export function hideDialog() {
  globalThis.dispatchEvent(new CustomEvent<DialogEvent>(dialogEventKey, { detail: { type: 'hide' } }));
}

export function useDialog() {
  // Trả về 2 hàm để show/hide dialog ở bất kỳ đâu
  const open = useCallback((payload?: any) => showDialog(payload), []);
  const close = useCallback(() => hideDialog(), []);
  return { open, close };
}
