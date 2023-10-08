import IconAuth from '@/components/Icon/IconAuth';
import IconAuthor from '@/components/Icon/IconAuthor';
import IconDepartment from '@/components/Icon/IconDepartment';
import IconPosition from '@/components/Icon/IconPosition';
import IconProject from '@/components/Icon/IconProject';
import IconTools from '@/components/Icon/IconTools';
import IconUser from '@/components/Icon/IconUser';

export const SIDE_BARS = [
  {
    id: 'quan-ly-du-an',
    title: 'Quản lý dự án',
    prefixIcon: <IconProject />,
    children: [
      {
        id: 'du-an-1',
        title: 'Dự án 1',
        href: '/1',
      },
      {
        id: 'du-an-2',
        title: 'Dự án 2',
        href: '/2',
      },
    ],
  },
  {
    id: 'quan-ly-nhan-vien',
    title: 'Quản lý nhân viên',

    prefixIcon: <IconUser />,
    children: [
      {
        id: 'nhan-vien',
        title: 'Nhân viên',
        href: '/nhan-vien',
      },
      {
        id: 'chung-chi',
        title: 'Chứng chỉ',
        href: '/chung-chi',
      },
      {
        id: 'bang-cap',
        title: 'Bằng cấp',
        href: '/bang-cap',
      },
    ],
  },
  {
    id: 'quan-ly-nguon-luc',
    title: 'Quản lý nguồn lực',
    prefixIcon: <IconTools />,
    children: [
      {
        id: 'cong-cu',
        title: 'Công cụ',
        href: '/cong-cu',
      },
      {
        id: 'vat-tu',
        title: 'Vật tư',
        href: '/vat-tu',
      },
      {
        id: 'nguyen-lieu',
        title: 'Nguyên liệu',
        href: '/nguyen-lieu',
      },
    ],
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
    id: 'phan-quyen-tai-khoan',
    title: 'Phân quyền tài khoản',
    prefixIcon: <IconAuthor />,
    href: '/phan-quyen-tai-khoan',
  },
];

export const ACTIVE_MENUS = {
  '/chung-chi': 'quan-ly-nhan-vien',
  '/bang-cap': 'quan-ly-nhan-vien',
  '/nhan-vien': 'quan-ly-nhan-vien',
  '/quan-ly-tai-khoan': 'quan-ly-tai-khoan',
  '/cong-cu': 'quan-ly-nguon-luc',
  '/vat-tu': 'quan-ly-nguon-luc',
} as const;
