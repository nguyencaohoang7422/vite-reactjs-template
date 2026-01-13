import { selectUser } from '@/features/auth';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  children?: React.ReactNode;
  restricted?: boolean; // true = không cho user đã login truy cập
}

export const PublicRoute = ({ 
  children, 
  restricted = false 
}: PublicRouteProps) => {
  const user  = useSelector(selectUser);

  // Nếu đã login và route bị restricted (như login page)
  // thì redirect về dashboard
  if (user && restricted) {
    return <Navigate to="/" />;
  }

  return children ? <>{children}</> : <Outlet />;
};
