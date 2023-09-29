'use client';

import { Sidebar } from '@/components/ui/sidebar/sidebar';
import { themeSelectors } from '@/store/selectors/theme-selectors';

export default function Home() {
  const toggleSidebar = themeSelectors.use.toggleSidebar();
  return (
    <>
      <Sidebar />
      <div className="main-content flex flex-col min-h-screen">
        <button onClick={() => toggleSidebar()}>toggle</button>
      </div>
    </>
  );
}
