import Link from 'next/link';
import React from 'react';

const InterceptingPage = () => {
	return (
		<div>
			<div className="flex gap-8">
				<Link href="/learning/intercepting/page1" className="link">
					Go to page1
				</Link>
				<Link href="/learning/intercepting/page2" className="link">
					Go to page2 (intercepting at root)
				</Link>
			</div>
			<p className="title">InterceptingPage</p>
		</div>
	);
};

export default InterceptingPage;
