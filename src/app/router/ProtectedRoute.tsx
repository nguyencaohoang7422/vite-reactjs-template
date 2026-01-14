import type { RootState } from '@/configs';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectPath = '/login' 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  // Hiển thị loading trong khi check authentication
  if (isLoading) {
    return <div>Loading...</div> ;
  }

  // Nếu chưa đăng nhập, redirect về login và lưu location hiện tại
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Render children hoặc Outlet cho nested routes
  return children ? <>{children}</> : <Outlet />;
};
