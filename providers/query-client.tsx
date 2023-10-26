'use client';
import UserProvider from '@/context/user-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const Providers = ({ children }: LayoutProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
      </QueryClientProvider>
      <Toaster duration={2000} closeButton richColors position="top-right" />
    </>
  );
};

export default Providers;
