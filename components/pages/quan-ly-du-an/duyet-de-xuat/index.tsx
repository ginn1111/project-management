'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReactSheet from '@/components/ui/react-sheet';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useRef } from 'react';
import DetailDuyetDeXuat from './detail-duyet-de-xuat';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.binary(),
    description: faker.finance.ethereumAddress(),
    time: faker.date.anytime(),
    employee: faker.internet.displayName(),
    status:
      Math.floor(Math.random()) > 0.6
        ? 'Đang chờ duyệt'
        : Math.floor(Math.random()) > 0.3
        ? 'Từ chối'
        : 'Đã duyệt',
  }));

const DuyetDeXuat = () => {
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalAC: { open: false },
    modalDN: { open: false },
  });
  const sheetRef = useRef<{
    handleOpen: () => void;
    handleClose: () => void;
  }>();
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'id',
    },
    {
      accessorKey: 'description',
      size: 100,
    },
    {
      accessorKey: 'time',
      cell: ({ row }) => dayjs(row.getValue('time')).format('DD/MM/YYYY'),
    },
    {
      accessorKey: 'employee',
    },
    {
      accessorKey: 'status',
      minSize: 200,
    },
    {
      id: 'action',
      header: '',
      size: 70,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
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
              <DropdownMenuItem onClick={() => sheetRef.current?.handleOpen()}>
                Chi tiết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div className="mx-2">
      <DataTable data={DUMMY} columns={columns} />
      <ReactSheet
        ref={sheetRef}
        title="Chi tiết đề xuất"
        className="w-[50vw] sm:max-w-[800px]"
      >
        <DetailDuyetDeXuat />
      </ReactSheet>
      <ModalConfirm
        open={modal.modalDN.open}
        onAccept={() => {}}
        onClose={() => handleCloseModal('modalDN')}
        title="Xác nhận từ chối đề xuất"
        message="Bạn có muốn từ chối đề xuất này?"
        msgCTA="Từ chối"
        variant="destructive"
      />
      <ModalConfirm
        open={modal.modalAC.open}
        onAccept={() => {}}
        onClose={() => handleCloseModal('modalAC')}
        title="Xác nhận duyệt đề xuất"
        message="Bạn có muốn duyệt đề xuất này?"
        msgCTA="Duyệt"
        variant="default"
      />
    </div>
  );
};

export default DuyetDeXuat;
