'use client';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import DataTable from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';
import ModalChuyenPB from './modal/modal-chuyen-pb';
import ModalThemBangCap from './modal/modal-them-bang-cap';
import ModalThemChungChi from './modal/modal-them-chung-chi';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';
import Link from 'next/link';

const DUMMY = Array(100)
  .fill(0)
  .map(() => ({
    id: faker.string.alpha(),
    hoTen: faker.internet.displayName(),
    dienThoai: faker.location.country(),
    diaChi: faker.phone.number(),
    phongBan: faker.internet.email(),
    email: faker.internet.email(),
    gioiTinh: Math.floor(Math.random()) < 0.5 ? 'Nam' : 'Nữ',
  }));
const TableNhanVien = () => {
  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false },
    modalRM: { open: false },
    modalPB: { open: false },
    modalBC: { open: false },
    modalCC: { open: false },
  });
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      accessorKey: 'id',
    },
    {
      accessorKey: 'hoTen',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Họ tên" />
      ),
    },
    {
      accessorKey: 'phongBan',
    },
    {
      accessorKey: 'diaChi',
    },
    {
      accessorKey: 'dienThoai',
    },
    {
      accessorKey: 'email',
    },
    {
      accessorKey: 'gioiTinh',
    },
    {
      id: 'action',
      header: '',
      size: 70,
      cell: () => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-[10px]">
            <DropdownMenuItem onClick={() => handleOpenModal('modalNV')}>
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href="/nhan-vien/id-nhan-vien">
                Chi tiết
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalPB')}>
              Chuyển phòng ban
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalBC')}>
              Thêm bằng cấp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenModal('modalCC')}>
              Thêm chứng chỉ
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalRM')}
              className="text-danger hover:!text-danger"
            >
              Xoá
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  return (
    <>
      <DataTable data={DUMMY} columns={columns} />
      <ModalThemNhanVien
        open={modal.modalNV.open}
        title="Sửa nhân viên"
        onClose={() => handleCloseModal('modalNV')}
        data={{}}
        isEdit
      />
      <ModalConfirm
        title="Xoá nhân viên"
        message="Bạn có muốn xoá nhân viên này?"
        onAccept={() => {}}
        onClose={() => handleCloseModal('modalRM')}
        open={modal.modalRM.open}
      />
      <ModalChuyenPB
        open={modal.modalPB.open}
        onClose={() => handleCloseModal('modalPB')}
        title="Chuyển phòng ban nhân viên"
        data={{}}
      />
      <ModalThemBangCap
        open={modal.modalBC.open}
        onClose={() => handleCloseModal('modalBC')}
        title="bằng cấp"
      />
      <ModalThemChungChi
        open={modal.modalCC.open}
        onClose={() => handleCloseModal('modalCC')}
        title="chứng chỉ"
      />
    </>
  );
};

export default TableNhanVien;
