'use client';

import IconChecks from '@/components/Icon/IconChecks';
import IconCircleCheck from '@/components/Icon/IconCircleCheck';
import IconEdit from '@/components/Icon/IconEdit';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import IconRecommend from '@/components/Icon/IconRecommend';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Dropdown from '@/components/ui/header/dropdown';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import Filter from './filter';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.alphanumeric(),
    name: faker.internet.displayName(),
    project: faker.string.binary(),
    role: faker.string.hexadecimal(),
  }));

const DuyetNhanVien = () => {
  const { handleOpenModal, handleCloseModal, modal } = useModal({
    modalDN: { open: false },
    modalAC: { open: false },
  });
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'id',
    },
    {
      accessorKey: 'name',
    },
    {
      accessorKey: 'project',
    },
    {
      accessorKey: 'role',
    },
    {
      id: 'action',
      header: '',
      size: 70,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <IconEllipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleOpenModal('modalAC')}>
              Duyệt
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalDN')}>
              Từ chối
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <div className="m-2 p-2 rounded-sm">
      <div className="mb-2">
        <Filter />
      </div>
      <DataTable columns={columns} data={DUMMY} />
      <ModalConfirm
        title="Từ chối đề xuất"
        message="Bạn có muốn từ chối đề xuất này?"
        open={modal.modalDN.open}
        onClose={() => handleCloseModal('modalDN')}
        onAccept={() => {}}
        msgCTA="Từ chối"
      />
      <ModalConfirm
        open={modal.modalAC.open}
        title="Duyệt nhân viên tham gia dự án"
        message="Bạn có muốn duyệt nhân viên này tham gia dự án?"
        onClose={() => handleCloseModal('modalAC')}
        onAccept={() => {}}
        variant="default"
        msgCTA="Duyệt"
      />
    </div>
  );
};

export default DuyetNhanVien;
