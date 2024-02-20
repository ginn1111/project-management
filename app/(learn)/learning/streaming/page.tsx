import CriticalContent from '@/components/learning/critical-content';
import NonCriticalContent from '@/components/learning/non-critical-content';
import Link from 'next/link';
import React, { Suspense } from 'react';

async function fakeFetchCriticalContent() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('fakeFetch');
		}, 2000);
	});
}

function StreamingPage() {
	// const criticalContentData = await fakeFetchCriticalContent();

	return (
		<section>
			<Link href="/learning/parallel/setting">Goto Parallel</Link>
			<CriticalContent />
			<Suspense fallback={<div>Loading ...</div>}>
				<NonCriticalContent />
			</Suspense>
		</section>
	);
}

export default StreamingPage;
