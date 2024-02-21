import CriticalContent from '@/components/learning/critical-content';
import NonCriticalContent from '@/components/learning/non-critical-content';
import Loading from '@/components/ui/loading';
import Link from 'next/link';
import React, { Suspense } from 'react';

async function fakeFetchCriticalContent() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('fakeFetch');
		}, 2000);
	});
}

async function StreamingPage() {
	const criticalContentData = await fakeFetchCriticalContent();

	return (
		<section className="flex gap-4 w-full">
			<CriticalContent />
			<Suspense fallback={<div>Loading ...</div>}>
				<NonCriticalContent />
			</Suspense>
		</section>
	);
}

export default StreamingPage;
