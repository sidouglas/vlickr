import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

import { RouterProvider } from 'react-router-dom';
import { routes } from './router';
import { Toast } from './components/Toast';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
