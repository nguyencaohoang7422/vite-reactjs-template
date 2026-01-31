import { initSocket, selectStateByKey, type SocketState } from '@/app/store';
import { selectAuthState } from '@/auth';
import { socketBaseUrl } from '@/shared';
import GlobalDialogProvider from '@/shared/components/dialog/GlobalDialogProvider';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLayout from './HeaderLayout/HeaderLayout';
import MainLayout from './MainLayout/MainLayout';

const PrivateLayout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthState('user'));
  const mainSocket = useSelector(selectStateByKey('mainSocket')) as SocketState;
  const token = useSelector(selectAuthState('token'));
  useEffect(() => {
    if (isAuthenticated && !mainSocket.initialized) {
      dispatch(initSocket({ url: `${socketBaseUrl}?token=${token as string}`, type: 'mainSocket' }));
    }
  }, [isAuthenticated, mainSocket, dispatch, token]);
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <GlobalDialogProvider />
      <HeaderLayout />
      <MainLayout />
    </div>
  );
};

export default PrivateLayout;
