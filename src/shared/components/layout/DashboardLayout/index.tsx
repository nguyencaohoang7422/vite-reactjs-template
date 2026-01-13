import { logout } from '@/features/auth/store/authSlice';
import type { RootState } from '@/libs';
import { apiClient } from '@/shared/api/apiClient';
import { Button } from '@/shared/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

export const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleCallApi = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const req = `${baseUrl}/Menu/find`;
    try {
      const res = await apiClient.post(req);
      if(res.data.success){
        toast.success('Goi api thành công');
      }
      console.log("🚀 ~ handleCallApi ~ res:", res)
    } catch (error : any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">My App</h2>
          <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
        </div>
        
        <nav className="space-y-2">
          <button type='button' onClick={handleCallApi}>
            solo cùng bolero
          </button>


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
          
          {/* Admin menu - chỉ hiển thị cho admin */}
          {(user?.role === 'admin' || user?.role === 'superadmin') && (
            <>
              <hr className="my-4 border-gray-600" />
              <Link 
                to="/admin" 
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Admin Dashboard
              </Link>
              <Link 
                to="/admin/users" 
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                User Management
              </Link>
            </>
          )}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};
