import { selectAuthState } from '@/auth';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PublicRouteProps {
  children?: ReactNode;
  restricted?: boolean; // true = không cho user đã login truy cập
}

export const PublicRoute = ({ children, restricted = false }: PublicRouteProps) => {
  const user = useSelector(selectAuthState('user'));
  if (user && restricted) {
    return <Navigate to="/" />;
  }
  return children ? <>{children}</> : <Outlet />;
};
