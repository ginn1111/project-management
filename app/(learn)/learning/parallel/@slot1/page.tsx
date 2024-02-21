import Link from 'next/link';
import React from 'react';

const Slot1Page = () => {
	return (
		<>
			<div>
				<Link className="link italic" href="/learning/parallel/setting">
					Setting
				</Link>
				<p>Slot1Page</p>
			</div>
		</>
	);
};

export default Slot1Page;
