import Link from 'next/link';
import React, { ReactNode } from 'react';

const ParallelLayout = ({
	children,
	slot1,
	slot2,
}: {
	children: ReactNode;
	slot1: ReactNode;
	slot2: ReactNode;
}) => {
	return (
		<section>
			<Link href="/learning/parallel/setting">Goto Setting</Link>
			{children}
			{slot1}
			{slot2}
		</section>
	);
};

export default ParallelLayout;
