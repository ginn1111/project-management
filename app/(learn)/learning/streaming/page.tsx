import CriticalContent from '@/components/learning/critical-content';
import NonCriticalContent from '@/components/learning/non-critical-content';
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
			<CriticalContent />
			<Suspense fallback={<div>Loading ...</div>}>
				<NonCriticalContent />
			</Suspense>
		</section>
	);
}

export default StreamingPage;
