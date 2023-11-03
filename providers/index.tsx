'use client';
import { SessionProvider } from 'next-auth/react';
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
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
				<Toaster duration={5000} closeButton richColors position="top-right" />
			</SessionProvider>
		</>
	);
};

export default Providers;
