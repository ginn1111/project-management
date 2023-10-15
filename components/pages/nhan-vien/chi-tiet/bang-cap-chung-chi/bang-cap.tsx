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
import ModalChuyenMon from './modal/modal-chuyen-mon';
import ModalThemBangCap from '../../modal/modal-them-bang-cap';
import { Button } from '@/components/ui/button';
import IconPlus from '@/components/Icon/IconPlus';

const DUMMY = Array(10)
  .fill(0)
  .map(() => ({
    ten: faker.internet.displayName(),
    ngayCap: faker.date.anytime(),
    chuyenMon: faker.string.alphanumeric(),
    ghiChu: faker.string.uuid(),
  }));

const BangCap = () => {
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalCM: { open: false },
    modalCS: { open: false, isEdit: false },
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
      accessorKey: 'chuyenMon',
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
            <DropdownMenuItem onClick={() => handleOpenModal('modalCM')}>
              Chuyên môn
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalCS', { isEdit: true })}
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
        <p className="text-lg font-bold mb-1">Bằng cấp</p>
        <Button onClick={() => handleOpenModal('modalCS', { isEdit: false })}>
          <IconPlus />
        </Button>
      </div>
      <DataTable data={DUMMY} columns={columns} />
      <ModalChuyenMon
        open={modal.modalCM.open}
        onClose={() => handleCloseModal('modalCM')}
        title="Chuyên môn"
      />
      <ModalThemBangCap
        isEdit={modal.modalCS.isEdit}
        open={modal.modalCS.open}
        onClose={() => handleCloseModal('modalCS')}
        title="bằng cấp"
      />
    </div>
  );
};

export default BangCap;
