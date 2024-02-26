import React from 'react';

const InterceptingLayout = ({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) => {
	return (
		<>
			{children}
			{modal}
		</>
	);
};

export default InterceptingLayout;
