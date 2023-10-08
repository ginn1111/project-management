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
        href: '#',
      },
      {
        id: 'du-an-2',
        title: 'Dự án 2',
        href: '#',
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
        href: '#',
      },
      {
        id: 'chung-chi',
        title: 'Chứng chỉ',
        href: '#',
      },
      {
        id: 'bang-cap',
        title: 'Bằng cấp',
        href: '#',
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
        href: '#',
      },
      {
        id: 'vat-tu',
        title: 'Vật tư',
        href: '#',
      },
      {
        id: 'nguyen-lieu',
        title: 'Nguyên liệu',
        href: '#',
      },
    ],
  },
  {
    id: 'quan-ly-tai-khoan',
    title: 'Quản lý tài khoản',
    prefixIcon: <IconAuth />,
    href: '#',
  },
  {
    id: 'quan-ly-chuc-vu',
    title: 'Quản lý chức vụ',
    prefixIcon: <IconPosition />,
    href: '#',
  },
  {
    id: 'quan-ly-phong-ban',
    title: 'Quản lý phòng ban',
    prefixIcon: <IconDepartment />,
    href: '#',
  },
  {
    id: 'phan-quyen-tai-khoan',
    title: 'Phân quyền tài khoản',
    prefixIcon: <IconAuthor />,
    href: '#',
  },
];
