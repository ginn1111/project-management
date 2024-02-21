'use client';
import BreadCrumb from '@/components/ui/bread-crumb';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

const LearningLayout = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	return (
		<main className="relative container py-10 px-5">
			<BreadCrumb pathname={pathname} />
			{children}
		</main>
	);
};

export default LearningLayout;
