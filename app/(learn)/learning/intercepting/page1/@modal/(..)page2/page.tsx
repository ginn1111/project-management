'use client';
import Modal from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import React from 'react';

const InterceptingPage2 = () => {
	const router = useRouter();
	return (
		<Modal open onClose={router.back} title="Modal intercepting page2">
			<div>InterceptingPage2</div>
		</Modal>
	);
};

export default InterceptingPage2;
