import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { RoleBasedRoute } from './RoleBasedRoute';

// Layouts
import { AuthLayout } from '@/shared/components/layout/AuthLayout/AuthLayout';

// Public Pages
import { LoginPage } from '@/features/auth/pages/page';
import Dashboard from '@/features/dashboard/pages/page';
import PrivateLayout from '@/shared/components/layout/PrivateLayout';
import PageForbidden from '@/shared/pages/forbidden';
import PageNotFound from '@/shared/pages/not-found';

// Protected Pages


export const routes: RouteObject[] = [


  // Auth routes (restricted for logged in users)
  {
    element: (
      <PublicRoute restricted={true}>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      // {
      //   path: '/register',
      //   element: <RegisterPage />,
      // },
      // {
      //   path: '/forgot-password',
      //   element: <div>Forgot Password Page</div>,
      // },
    ],
  },

  // Protected routes với DashboardLayout
  {
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      {
       path: '/',
       element: <Dashboard/>,
     },
      // {
      //   path: '/dashboard',
      //   element: <DashboardPage />,
      // },
      // {
      //   path: '/profile',
      //   element: <ProfilePage />,
      // },
      // {
      //   path: '/settings',
      //   element: <SettingsPage />,
      // },
      
      // Nested routes cho Products feature
      {
        path: '/products',
        children: [
        //   {
        //     index: true,
        //     element: <ProductListPage />,
        //   },
        //   {
        //     path: ':productId',
        //     element: <ProductDetailPage />,
        //   },
        //   {
        //     path: 'create',
        //     element: <ProductCreatePage />,
        //   },
        ],
      },
    ],
  },

  // Admin routes - chỉ cho admin role
  {
    element: (
      <RoleBasedRoute allowedRoles={['admin', 'superadmin']}>
        {/* <DashboardLayout /> */}
      </RoleBasedRoute>
    ),
    children: [
      // {
      //   path: '/admin',
      //   element: <AdminDashboard />,
      // },
      // {
      //   path: '/admin/users',
      //   element: <UserManagementPage />,
      // },
    ],
  },

  // Forbidden route - khi không có quyền truy cập
  {
    path: '/forbidden',
    element: <PageForbidden />,
  },

  // 404 route - phải ở cuối cùng để catch tất cả các path không match
  {
    path: '*',
    element: <PageNotFound />,
  },
];
