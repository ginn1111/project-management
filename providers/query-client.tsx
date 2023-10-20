'use client';
import { Toaster, toast } from 'sonner';
import { QueryClient, QueryClientProvider } from 'react-query';

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster duration={2000} closeButton richColors position="top-right" />
    </>
  );
};

export default Providers;
