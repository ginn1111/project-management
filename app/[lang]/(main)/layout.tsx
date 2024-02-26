import Header from '@/components/ui/header';
import { Sidebar } from '@/components/ui/sidebar/sidebar';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import authOptions from '../../api/auth/[...nextauth]/options';

const MainLayout = async ({
	test,
	feature,
}: {
	feature: ReactNode;
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
						{feature}
					</div>
				</>
			) : (
				test
			)}
		</>
	);
};

export default MainLayout;
