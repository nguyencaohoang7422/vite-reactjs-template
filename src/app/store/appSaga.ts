import { eventChannel, type SagaIterator } from 'redux-saga';
import { call, put, take, takeLeading } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { cleanupSocket, initSocket, socketConnected, socketDisconnected, type SocketType } from './appSlice';

const socketInstances: Record<SocketType, Socket | null> = {
  mainSocket: null,
  pluginSocket: null,
};
function createSocketChannel(socket: Socket, type: SocketType) {
  return eventChannel((emit) => {
    socket.on('connect', () => {
      console.warn('Socket connected');
      emit({ type: 'CONNECTED' });
    });

    socket.on('disconnect', (reason) => {
      console.warn('Socket disconnected:', reason);
      emit({ type: 'DISCONNECTED' });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
      emit({ type: 'ERROR', error });
    });

    socket.on('connect_timeout', () => {
      console.error('Connection timeout');
      emit({ type: 'ERROR', error: new Error('Connection timeout') });
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      emit({ type: 'ERROR', error });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('connect_timeout');
      socket.off('error');
      socket.disconnect();
      socketInstances[type] = null;
    };
  });
}

function* handleSocketInit(action: ReturnType<typeof initSocket>): SagaIterator {
  const { type, url } = action.payload; // type: 'mainSocket' | 'pluginSocket'
  if (socketInstances[type]?.connected) return;
  try {
    socketInstances[type] = io(url, {
      transports: ['websocket', 'polling'], // Thử polling nếu websocket fail
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000,
      autoConnect: true,
      secure: true, // Bắt buộc với wss://
      rejectUnauthorized: false, // Nếu SSL certificate tự ký
    });

    const channel = yield call(createSocketChannel, socketInstances[type], type);

    while (true) {
      const event = yield take(channel);
      switch (event.type) {
        case 'CONNECTED':
          yield put(socketConnected({ type }));
          break;
        case 'DISCONNECTED':
          yield put(socketDisconnected({ type }));
          break;
        case 'ERROR':
          console.error('Socket error:', event.error);
          break;
      }
    }
  } catch (e) {
    console.error('Socket initialization error:', e);
  }
}

function handleSocketCleanup(action: ReturnType<typeof cleanupSocket>) {
  const { type } = action.payload;
  if (socketInstances[type]) {
    socketInstances[type]?.disconnect();
    socketInstances[type] = null;
  }
}

export default function* appSaga() {
  yield takeLeading(initSocket.type, handleSocketInit);
  yield takeLeading(cleanupSocket.type, handleSocketCleanup);
}

export const getSocketInstance = (type: SocketType): Socket | null => socketInstances[type];
