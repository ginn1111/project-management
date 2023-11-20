import LayoutQLDA from '@/components/layout/quan-ly-du-an/layout-qlda';

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<LayoutQLDA />
			<div className="relative h-[90vh]">{children}</div>
		</>
	);
};

export default Layout;
