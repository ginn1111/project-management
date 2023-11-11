'use client';

import { themeSelectors } from '@/store/selectors/theme-selectors';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const sidebar = themeSelectors.use.sidebar();
	return (
		<div
			className={`${
				(sidebar && 'toggle-sidebar') || ''
			} vertical main-section relative font-nunito text-sm font-normal antialiased`}
		>
			<div
				className={`main-container min-h-screen text-black dark:text-white-dark`}
			>
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
