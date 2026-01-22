import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

// Layouts
import { AuthLayout } from '@/shared/components/layout/AuthLayout/AuthLayout';

// Public Pages
import PrivateLayout from '@/shared/components/layout/PrivateLayout';
import ErrorPage from '@/shared/pages/error-page';
import PageForbidden from '@/shared/pages/forbidden';
import PageNotFound from '@/shared/pages/not-found';
import HomePage from '@/features/home/pages/page.tsx';
import LoginPage from '@/auth/pages/LoginPage.tsx';
import StaffUI from '@/features/timekeeping/pages/staff.tsx';
import AccountManagersUI from '@/features/account-managers/pages/AccountManagersUI.tsx';

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
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/timekeeping',
        element: <StaffUI />,
      },
      {
        path: '/account-managers',
        element: <AccountManagersUI />,
      },
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
  // {
  //   element: (
  //     <RoleBasedRoute allowedRoles={['admin', 'superadmin']}>
  //       {/* <DashboardLayout /> */}
  //     </RoleBasedRoute>
  //   ),
  //    errorElement: <ErrorPage />,
  //   children: [
  //
  //   ],
  // },

  // Forbidden route - khi không có quyền truy cập
  {
    path: '/forbidden',
    element: <PageForbidden />,
  },

  // 404 route - phải ở cuối cùng để catch tất cả các path không match
  {
    path: '*',
    errorElement: <ErrorPage />,
    element: <PageNotFound />,
  },
];
