import { logout } from '@/features/auth/store/authSlice';
import { Button } from '@/shared/components/ui/button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SidebarLayout = () => {
    const dispatch = useDispatch();
      const handleLogout = () => {
        dispatch(logout());
      };
  return (
   <aside id="sidebar-layout" className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">My App</h2>
          <p className="text-sm text-gray-400">Welcome,</p>
        </div>
        
        <nav className="space-y-2">
       

          <Link
            to="/dashboard" 
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link 
            to="/products" 
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Products
          </Link>
          <Link 
            to="/profile" 
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Profile
          </Link>
          <Link 
            to="/settings" 
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Settings
          </Link>
           <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </nav>
        
       
      </aside>
  )
}

export default SidebarLayout
