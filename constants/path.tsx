import IconAuth from '@/components/Icon/IconAuth';
import IconDepartment from '@/components/Icon/IconDepartment';
import IconLockTwoTone from '@/components/Icon/IconLockTwoTone';
import IconPosition from '@/components/Icon/IconPosition';
import IconProject from '@/components/Icon/IconProject';
import IconTools from '@/components/Icon/IconTools';
import IconUser from '@/components/Icon/IconUser';

export const SIDE_BARS = [
  {
    id: 'du-an',
    title: 'Dự án',
    prefixIcon: <IconProject />,
    href: '/du-an',
  },
  {
    id: 'quan-ly-nhan-vien',
    title: 'Quản lý nhân viên',
    prefixIcon: <IconUser />,
    href: '/nhan-vien',
  },
  {
    id: 'quan-ly-nguon-luc',
    title: 'Quản lý nguồn lực',
    prefixIcon: <IconTools />,
    href: '/quan-ly-nguon-luc',
  },
  {
    id: 'quan-ly-tai-khoan',
    title: 'Quản lý tài khoản',
    prefixIcon: <IconAuth />,
    href: '/quan-ly-tai-khoan',
  },
  {
    id: 'quan-ly-chuc-vu',
    title: 'Quản lý chức vụ',
    prefixIcon: <IconPosition />,
    href: '/quan-ly-chuc-vu',
  },
  {
    id: 'quan-ly-phong-ban',
    title: 'Quản lý phòng ban',
    prefixIcon: <IconDepartment />,
    href: '/quan-ly-phong-ban',
  },
  {
    id: 'duyet-de-xuat-nhan-vien',
    title: 'Duyệt đề xuất nhân viên',
    prefixIcon: <IconLockTwoTone />,
    href: '/duyet-de-xuat-nhan-vien',
  },
];

export const ACTIVE_MENUS = {
  '/nhan-vien': 'quan-ly-nhan-vien',
  '/quan-ly-tai-khoan': 'quan-ly-tai-khoan',
  '/quan-ly-chuc-vu': 'quan-ly-chuc-vu',
  '/quan-ly-nguon-luc': 'quan-ly-nguon-luc',
  '/quan-ly-phong-ban': 'quan-ly-phong-ban',
  '/duyet-de-xuat-nhan-vien': 'duyet-de-xuat-nhan-vien',
  '/du-an': 'du-an',
} as const;
