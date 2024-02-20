import Header from '@/components/ui/header';
import { Sidebar } from '@/components/ui/sidebar/sidebar';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import authOptions from '../api/auth/[...nextauth]/options';
import { permanentRedirect } from 'next/navigation';
import { headers } from 'next/headers';

// export const dynamic = 'force-dynamic';

const MainLayout = async ({
	children,
	test,
}: {
	children: ReactNode;
	test: ReactNode;
}) => {
	const session = await getServerSession(authOptions);

	return (
		<>
			{session ? (
				<>
					<Sidebar />
					<div className="main-content flex flex-col min-h-screen relative">
						<Header />
						{children}
					</div>
				</>
			) : (
				test
			)}
		</>
	);
};

export default MainLayout;
