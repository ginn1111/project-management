import Link from 'next/link';
import React, { Fragment } from 'react';

type BreadCrumbProps = {
	pathname: string;
};

const BreadCrumb = (props: BreadCrumbProps) => {
	const { pathname } = props;

	const paths = pathname.split('/').filter((path) => path !== '');

	return (
		<nav className="mb-4">
			<ul className="flex gap-2">
				{paths.map((path, idx) => {
					return (
						<Fragment key={path}>
							<li>
								<Link
									className="text-base font-medium italic"
									href={`/${
										idx > 0 ? paths.slice(0, idx + 1).join('/') : path
									}`}
								>
									{path}
								</Link>
							</li>
							{idx + 1 >= paths.length ? null : (
								<span className="text-gray-500">/</span>
							)}
						</Fragment>
					);
				})}
			</ul>
		</nav>
	);
};

export default BreadCrumb;