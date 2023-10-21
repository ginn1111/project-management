'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { PositionServices } from '@/lib';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import ModalThemChucVu from './modal/modal-them-chuc-vu';

interface ITableChucVu {
  data: { positions: IPosition[]; totalItems: number };
}

const TableChucVu = (props: ITableChucVu) => {
  const router = useRouter();
  const { data } = props;
  const { handlePush, searchParams } = useQueryParams({
    initSearchParams: { page: 1, limit: 10, search: '' },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => PositionServices.remove(id),
  });

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalCHV: { open: false, position: {} },
    modalRM: { open: false, id: '' },
  });

  const columns = [
    {
      accessor: 'name',
      title: 'Tên chức vụ',
    },
    {
      accessor: 'note',
      title: 'Ghi chú',
    },
    {
      accessor: '',
      width: 70,
      render: (row: IPosition) => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-[10px]">
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalCHV', { position: row })}
            >
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalRM', { id: row?.id })}
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
      <div className="datatables">
        <DataTable
          noRecordsText="Không có dữ liệu"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={data.positions}
          columns={columns}
          totalRecords={data.totalItems}
          recordsPerPage={parseInt(searchParams.limit)}
          page={parseInt(searchParams.page)}
          onPageChange={(p) => {
            handlePush({ page: p });
          }}
          recordsPerPageOptions={[10, 20, 30, 50, 100]}
          onRecordsPerPageChange={(limit) => {
            handlePush({ limit, page: 1 });
          }}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Từ ${from} đến ${to} của ${totalRecords}`
          }
        />
      </div>
      <ModalConfirm
        loading={isLoading}
        title="Xoá chức vụ"
        message="Bạn có muốn xoá chức vụ này?"
        onAccept={() => {
          mutate(modal.modalRM.id);
          handleCloseModal('modalRM');
          toast.success('Xoá nhân viên thành công');
          router.refresh();
        }}
        onClose={() => handleCloseModal('modalRM')}
        open={modal.modalRM.open}
      />
      <ModalThemChucVu
        open={modal.modalCHV.open}
        data={modal.modalCHV.position}
        onClose={() => handleCloseModal('modalCHV')}
        title="Sửa chức vụ"
        onRefresh={() => router.refresh()}
        isEdit
      />
    </>
  );
};

export default TableChucVu;
