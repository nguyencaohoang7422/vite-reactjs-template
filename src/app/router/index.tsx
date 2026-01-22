import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

export const router = createBrowserRouter(routes); // loading routes

export const AppRouter = () => <RouterProvider router={router} />;
