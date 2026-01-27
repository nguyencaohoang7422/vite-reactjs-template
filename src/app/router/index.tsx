import features from '@/features';
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export const router = createBrowserRouter(routes); // loading routes

export const AppRouter = () => <RouterProvider router={router} />;
export const isRouteExist = (path: string): boolean => {
  const matches = matchRoutes(features, path);
  return matches !== null && matches.length > 0;
};
