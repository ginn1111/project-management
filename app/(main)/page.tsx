import LoadingInline from '@/components/ui/loading/loading-inline';
import { redirect } from 'next/navigation';
import React from 'react';

const Home = () => {
	redirect('/du-an');
	return (
		<div className="h-screen w-full relative">
			<LoadingInline />
		</div>
	);
};

export default Home;
