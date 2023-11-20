import Header from '@/components/ui/header';
import { Sidebar } from '@/components/ui/sidebar/sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const MainLayout = async ({ children }: LayoutProps) => {
	const session = await getServerSession(authOptions);
	if (!session) redirect('/authen');
	return (
		<>
			<Sidebar />
			<div className="main-content flex flex-col min-h-screen relative">
				<Header />
				{children}
			</div>
		</>
	);
};

export default MainLayout;
