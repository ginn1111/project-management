'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Page1 = () => {
	useEffect(() => () => console.log('Page1 unmount'), []);
	return (
		<div>
			<Link href="/learning/intercepting/page2">
				Go to page2 (intercepting page2)
			</Link>
			<p>Page1</p>
		</div>
	);
};

export default Page1;
