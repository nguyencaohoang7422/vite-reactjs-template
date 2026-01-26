import type { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PATH_ROUTING } from '@/shared';
import { PublicRoute } from './PublicRoute';
// Layouts
import HomePage from '@/features/home/pages/page.tsx';
import { AuthLayout } from '@/shared/components/layout/AuthLayout/AuthLayout';
import PrivateLayout from '@/shared/components/layout/PrivateLayout';
// Public Pages
import LoginPage from '@/auth/pages/LoginPage.tsx';
// Feature routes
import PageForbidden from '@/shared/pages/forbidden';
import PageNotFound from '@/shared/pages/not-found';
import features from '@/features';
import ErrorPage from '@/shared/pages/error-page';

export const routes: RouteObject[] = [
  // Auth routes (restricted for login users)
  {
    element: (
      <PublicRoute restricted={true}>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: PATH_ROUTING.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  // Protected routes with home layout
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
      ...features,
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
