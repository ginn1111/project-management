'use client';
import IconEdit from '@/components/Icon/IconEdit';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import IconXCircle from '@/components/Icon/IconXCircle';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Modal from '@/components/ui/modal';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';

const DUMMY: INhanVien[] = Array(100)
  .fill(0)
  .map(() => ({
    ID_NV: faker.string.alpha(),
    HO_TEN_NV: faker.internet.displayName(),
    DIA_CHI_NV: faker.location.country(),
    DIEN_THOAI_NV: faker.phone.number(),
    EMAIL_NV: faker.internet.email(),
    GIOI_TINH_NV: Math.floor(Math.random()) < 0.5 ? 'Nam' : 'Nữ',
  }));
const TableNhanVien = () => {
  const columns: ColumnDef<INhanVien>[] = [
    {
      accessorKey: 'ID_NV',
      header: 'Id',
    },
    {
      accessorKey: 'HO_TEN_NV',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Họ tên" />
      ),
    },
    {
      accessorKey: 'DIA_CHI_NV',
      header: 'Địa chỉ',
    },
    {
      accessorKey: 'DIEN_THOAI_NV',
      header: 'Điện thoại',
    },
    {
      accessorKey: 'EMAIL_NV',
      header: () => <div className="w-[100px]">Email</div>,
    },
    {
      accessorKey: 'GIOI_TINH_NV',
      header: 'Giới tính',
    },
    {
      header: 'Thao tác',
      cell: () => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit-content" side="left">
            <DropdownMenuItem className="flex items-center gap-2">
              <IconEdit className="text-sky-500" />
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <IconXCircle className="text-rose-500" />
              Xoá
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <>
      <DataTable<INhanVien> data={DUMMY} columns={columns} />
    </>
  );
};

export default TableNhanVien;
