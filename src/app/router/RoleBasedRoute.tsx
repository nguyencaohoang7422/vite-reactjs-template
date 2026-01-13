import type { RootState } from '@/libs';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode;
  redirectPath?: string;
}

export const RoleBasedRoute = ({ 
  allowedRoles, 
  children,
  redirectPath = '/unauthorized'
}: RoleBasedRouteProps) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <div>Loading....</div>
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
