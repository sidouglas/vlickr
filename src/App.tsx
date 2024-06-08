import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { routes } from './router';
import { Toast } from './components/Toast';
import { queryClient } from './api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;

