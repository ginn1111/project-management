'use client';

import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import { themeSelectors } from '@/store/selectors/theme-selectors';
import Link from 'next/link';
import { useState } from 'react';
import SidebarItem from './sidebar-item';

const SIDE_BARS = [
  {
    id: '1',
    title: 'Test',
    prefixIcon: <IconMenuDashboard />,
    children: [
      {
        id: '11',
        title: 'Test 11',
        href: 'google.com',
      },
      {
        id: '22',
        title: 'Test 11',
        href: 'google.com',
      },
    ],
  },
  {
    id: '2',
    title: 'Test',
    children: [
      {
        id: '11',
        title: 'Test 11',
        href: 'google.com',
      },
      {
        id: '22',
        title: 'Test 11',
        href: 'google.com',
      },
    ],
  },
];

export function Sidebar() {
  const [currentMenu, setCurrentMenu] = useState(SIDE_BARS[0].id);
  const toggleSidebar = themeSelectors.use.toggleSidebar();

  return (
    <nav
      className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
        true ? 'text-white-dark' : ''
      }`}
    >
      <div className="h-full bg-white dark:bg-black">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="main-logo flex shrink-0 items-center">
            <img
              className="ml-[5px] w-8 flex-none"
              src="/assets/images/logo.svg"
              alt="logo"
            />
            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
              {'VRISTO'}
            </span>
          </Link>
          <button
            onClick={() => toggleSidebar()}
            type="button"
            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
          >
            <IconCaretsDown className="m-auto rotate-90" />
          </button>
        </div>

        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
          {SIDE_BARS.map(({ id, children, ...sidebar }) => {
            return (
              <SidebarItem
                {...sidebar}
                key={id}
                onClick={() =>
                  setCurrentMenu((old) => {
                    if (old === id) return '';
                    return id;
                  })
                }
                childrenMenu={children}
                isActive={id === currentMenu}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
