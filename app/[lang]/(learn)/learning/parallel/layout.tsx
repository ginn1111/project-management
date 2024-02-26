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
		<section className="grid grid-cols-12 gap-4">
			<div className="card title col-span-6 row-start-1 row-end-3 min-h-[100px]">
				{children}
			</div>
			<div className="card title col-span-6 min-h-[100px]">{slot1}</div>
			<div className="card title col-span-6 min-h-[100px]">{slot2}</div>
		</section>
	);
};

export default ParallelLayout;
