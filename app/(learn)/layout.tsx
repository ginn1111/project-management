import React, { ReactNode } from 'react';

const LearningLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="flex justify-center min-h-screen align-center">
			{children}
		</main>
	);
};

export default LearningLayout;
