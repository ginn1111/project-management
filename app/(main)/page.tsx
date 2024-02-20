import LoadingInline from '@/components/ui/loading/loading-inline';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const Home = () => {
	const _headers = headers();
	console.log(_headers.get('x-pathname'));
	redirect('/du-an');
	return (
		<div className="h-screen w-full relative">
			<LoadingInline />
		</div>
	);
};

export default Home;
