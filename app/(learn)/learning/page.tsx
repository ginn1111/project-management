import TOCS from '@/constants/learning-tocs';
import Link from 'next/link';
import React from 'react';

const LearningPage = () => {
	return (
		<section>
			<h1 className="text-2xl font-bold mb-4">Table of content</h1>
			<nav>
				<ul className="grid grid-cols-12 gap-4">
					{TOCS.map((toc) => (
						<Link
							className="bg-card shadow-md rounded-md px-4 py-2 col-span-4"
							key={toc.href}
							href={toc.href}
						>
							<h2 className="text-lg text-sky-400 font-medium hover:underline">
								{toc.title}
							</h2>
						</Link>
					))}
				</ul>
			</nav>
		</section>
	);
};

export default LearningPage;
