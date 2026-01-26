// src/shared/hooks/useSocketEvent.ts
import { useEffect } from 'react';
import { getSocketInstance, type SocketType } from '@/app/store';

export const useSocketEvent = <T = any>(
  eventName: string,
  type: SocketType,
  callback: (data: T) => void,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    const socket = getSocketInstance(type);
    if (!socket) return;

    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, type, callback, ...dependencies]);
};
