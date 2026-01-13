import type { RootState } from '@/libs';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

export const MainLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            My App
          </Link>
          
          <div className="flex gap-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            
            {user ? (
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600">Login</Link>
                <Link to="/register" className="hover:text-blue-600">Register</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
