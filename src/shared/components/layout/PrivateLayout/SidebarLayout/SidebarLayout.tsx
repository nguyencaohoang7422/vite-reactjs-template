import { logout } from '@/auth/stores/authSlice';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup } from '@/shared/components/ui/sidebar';
import { useDispatch } from 'react-redux';
import SidebarHeader from './SidebarHeader';
const AppSidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
