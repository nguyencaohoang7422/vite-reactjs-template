import { logout } from '@/auth/stores/authSlice';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/libs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';

const SidebarLayout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <aside id="sidebar-layout" className={cn('w-70 bg-[#F8F9FA] p-4 text-[#171A1F]')}>
      <SidebarHeader />
      <nav className="space-y-2">
        <Tooltip>
          <TooltipTrigger>
            <Link to="/dashboard" className="block rounded px-4 py-2">
              Dashboard
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Dashboard</p>
          </TooltipContent>
        </Tooltip>

        <Link to="/products" className="block rounded px-4 py-2 hover:bg-gray-700">
          Products
        </Link>
        <Link to="/profile" className="block rounded px-4 py-2 hover:bg-gray-700">
          Profile
        </Link>
        <Link to="/settings" className="block rounded px-4 py-2 hover:bg-gray-700">
          Settings
        </Link>
        <Button onClick={handleLogout} variant="destructive" className="w-full">
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default SidebarLayout;
