import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { selectAuthState } from '@/auth';

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children?: ReactNode;
  redirectPath?: string;
}

export const RoleBasedRoute = ({ allowedRoles, children, redirectPath = '/forbidden' }: RoleBasedRouteProps) => {
  const { user, isLoading } = useSelector(selectAuthState());

  if (isLoading) {
    return <div>Loading....</div>;
  }

  // Kiểm tra nếu chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role của user
  const hasRequiredRole = allowedRoles.includes(user.role);

  if (!hasRequiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
