'use client';

import React from 'react';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return <div>{error.digest}</div>;
};

export default Error;
