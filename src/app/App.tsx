import LoadingFullPage from '@/shared/components/loading/loading-full';
import { Suspense } from 'react';
import { AppRouter } from './router';

function App() {
  return (
    <Suspense fallback={<LoadingFullPage />}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
