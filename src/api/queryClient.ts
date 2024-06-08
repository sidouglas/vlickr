import { QueryClient } from '@tanstack/react-query';

export const MINUTE = 1000 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE,
      staleTime: 10 * MINUTE,
      refetchOnWindowFocus: false,
    },
  },
});
