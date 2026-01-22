import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { ReactElement } from 'react';
import { selectAuthState } from '@/auth';
import LoadingFullPage from '@/shared/components/loading/loading-full.tsx';

interface ProtectedRouteProps {
  children?: ReactElement;
  redirectPath?: string;
}

export const ProtectedRoute = ({ children, redirectPath = '/login' }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isLoading } = useSelector(selectAuthState());

  // Hiển thị loading trong khi check authentication
  if (isLoading) {
    return <LoadingFullPage />;
  }
  // Nếu chưa đăng nhập, redirect về login và lưu location hiện tại
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Render children hoặc Outlet cho nested routes
  return children ? <>{children}</> : <Outlet />;
};
