'use client';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import DataTable from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/useModal';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';
import ModalThemChungChi from '../../modal/modal-them-chung-chi';
import { Button } from '@/components/ui/button';
import IconPlus from '@/components/Icon/IconPlus';

const DUMMY = Array(10)
  .fill(0)
  .map(() => ({
    ten: faker.internet.displayName(),
    ngayCap: faker.date.anytime(),
    ngayHetHan: faker.date.anytime(),
    ghiChu: faker.string.uuid(),
  }));

const ChungChi = () => {
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalCC: { open: false, isEdit: false },
  });
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'ten',
    },
    {
      accessorKey: 'ngayCap',
      cell: ({ row }) => (
        <p>{dayjs(row.getValue('ngayCap')).format('DD/MM/YYYY')}</p>
      ),
    },
    {
      accessorKey: 'ngayHetHan',
      cell: ({ row }) => (
        <p>{dayjs(row.getValue('ngayCap')).format('DD/MM/YYYY')}</p>
      ),
    },
    {
      accessorKey: 'ghiChu',
    },
    {
      id: 'action',
      size: 70,
      header: '',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalCC', { isEdit: true })}
            >
              Sửa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-bold mb-1">Chứng chỉ</p>
        <Button onClick={() => handleOpenModal('modalCC', { isEdit: false })}>
          <IconPlus />
        </Button>
      </div>
      <DataTable data={DUMMY} columns={columns} />
      <ModalThemChungChi
        isEdit={modal.modalCC.isEdit}
        open={modal.modalCC.open}
        onClose={() => handleCloseModal('modalCC')}
        title="chứng chỉ"
      />
    </div>
  );
};

export default ChungChi;
