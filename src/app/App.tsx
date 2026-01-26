import LoadingFullPage from '@/shared/components/loading/loading-full';
import { Suspense } from 'react';
import { AppRouter } from './router';
import { ThemeProvider } from '@/app/providers/theme-provider.tsx';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <Suspense fallback={<LoadingFullPage />}>
        <AppRouter />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
