import LayoutQLDA from '@/components/layout/quan-ly-du-an/layout-qlda';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <LayoutQLDA />
      {children}
    </div>
  );
};

export default Layout;
