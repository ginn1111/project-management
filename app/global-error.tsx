'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.log('global Error', error);
	}, [error]);

	return (
		<html>
			<body>
				<section>
					<p>{error.message}</p>
					<Button onClick={reset}>Try again</Button>
				</section>
			</body>
		</html>
	);
}

export default GlobalError;
