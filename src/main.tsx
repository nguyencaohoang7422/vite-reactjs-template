import '@/configs';
import '@/shared/api';
import '@/shared/constants';
import '@/styles/index.css'; // css config
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './app/App.tsx';
import { store } from './configs';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster
      duration={3000}
      position="top-right"
      toastOptions={{
        closeButton: true,
      }}
    />
    <App />
  </Provider>,
);
