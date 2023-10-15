import IconEllipsis from '@/components/Icon/IconEllipsis';
import DataTable from '@/components/ui/data-table';
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
import ModalChinhSuaQuyenDuAn from './modal/modal-chinh-sua-quyen-da';
import ModalGiaoViec from './modal/modal-giao-viec';
import ModalXemWorkLoad from './modal/modal-xem-workload';

const DUMMY = Array(20)
  .fill(0)
  .map(() => ({
    id: faker.string.alphanumeric(),
    name: faker.internet.displayName(),
    email: faker.internet.email(),
  }));

const NhanVienDuAn = () => {
  const { modal, handleCloseModal, handleOpenModal } = useModal({
    modalPQ: { open: false },
    modalGV: { open: false },
    modalRM: { open: false },
    modalWL: { open: false },
  });
  const columns: ColumnDef<(typeof DUMMY)[0]>[] = [
    {
      id: 'id',
      accessorKey: 'id',
    },
    {
      id: 'name',
      accessorKey: 'name',
    },
    {
      id: 'email',
      accessorKey: 'email',
    },
    {
      id: 'actions',
      header: '',
      size: 70,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex justify-center">
                <IconEllipsis />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleOpenModal('modalPQ')}>
                Chỉnh sửa quyền dự án
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenModal('modalGV')}>
                Giao việc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenModal('modalRM')}>
                Xoá khỏi dự án
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenModal('modalWL')}>
                Xem workload
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="mx-2">
      <DataTable columns={columns} data={DUMMY} />

      <ModalChinhSuaQuyenDuAn
        title="Chỉnh sửa quyền dự án"
        open={modal.modalPQ.open}
        onClose={() => handleCloseModal('modalPQ')}
      />
      <ModalGiaoViec
        title="Giao việc"
        open={modal.modalGV.open}
        onClose={() => handleCloseModal('modalGV')}
      />
      <ModalConfirm
        title="Xoá thành viên ra khỏi dự án"
        message="Bạn có muốn xoá thành viên này ra khỏi dự án?"
        open={modal.modalRM.open}
        onClose={() => handleCloseModal('modalRM')}
        onAccept={() => {}}
      />
      <ModalXemWorkLoad
        title="Workload của nhân viên trong dự án"
        open={modal.modalWL.open}
        onClose={() => handleCloseModal('modalWL')}
      />
    </div>
  );
};

export default NhanVienDuAn;
