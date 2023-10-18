import MainLayout from '@/layout/main-layout';
import Providers from '@/providers/query-client';
import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['vietnamese'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Project management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
