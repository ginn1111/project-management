import MainLayout from '@/layout/main-layout';
import Providers from '@/providers';
import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';

const nunito = Nunito({ subsets: ['vietnamese'], variable: '--font-sans' });

export const metadata: Metadata = {
	title: 'Project management',
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={nunito.className}>
				<Providers>
					<MainLayout>{children}</MainLayout>
				</Providers>
			</body>
		</html>
	);
}
