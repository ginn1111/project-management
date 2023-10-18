'use client';
import { Toaster, toast } from 'sonner';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Providers = ({ children }: LayoutProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster closeButton richColors />
    </>
  );
};

export default Providers;
