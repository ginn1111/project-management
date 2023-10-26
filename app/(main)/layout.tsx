import Header from '@/components/ui/header';
import { Sidebar } from '@/components/ui/sidebar/sidebar';

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <div className="main-content flex flex-col min-h-screen">
        <Header />
        {children}
      </div>
    </>
  );
};

export default MainLayout;
