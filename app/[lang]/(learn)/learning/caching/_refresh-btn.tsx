'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const RefreshButton = () => {
	const router = useRouter();

	return <Button onClick={() => router.refresh()}>Refresh</Button>;
};

export default RefreshButton;
