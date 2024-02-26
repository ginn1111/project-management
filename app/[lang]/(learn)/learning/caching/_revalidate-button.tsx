'use client';

import { Button } from '@/components/ui/button';
import { serverAction } from './_server-action';

const RevalidateBtn = () => {
	return (
		<Button onClick={async () => await serverAction()}>Revalidate Tag</Button>
	);
};

export default RevalidateBtn;
