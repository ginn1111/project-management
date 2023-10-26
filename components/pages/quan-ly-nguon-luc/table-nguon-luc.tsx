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
import * as EmployeeServices from '@/lib/employee';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

import vi from 'dayjs/locale/vi';
import ModalThemNguonLuc from './modal/modal-them-nguon-luc';

dayjs.locale(vi);

interface ITableNguonLuc {
  data: { resource: IResource[]; totalItems: number };
}

const TableNguonLuc = (props: ITableNguonLuc) => {
  const router = useRouter();
  const { data } = props;
  const { handlePush, searchParams } = useQueryParams({
    initSearchParams: { page: 1, limit: 10, search: '' },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => EmployeeServices.remove(id),
  });

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNL: { open: false, resource: {} },
  });

  const columns = [
    {
      accessor: 'name',
      title: 'Tên',
    },
    {
      accessor: 'resourceType.name',
      title: 'Loại',
    },
    {
      accessor: 'amount',
      title: 'Số lượng',
    },
    {
      accessor: 'note',
      title: 'Ghi chú',
    },
    {
      accessor: '',
      render: (row: IResource) => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-[10px]">
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalNL', { resource: row })}
            >
              Chỉnh sửa
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => handleOpenModal('modalRM', { id: row?.id })}
              className="text-danger hover:!text-danger"
            >
              Xoá
            </DropdownMenuItem> */}
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
          records={data.resource}
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
            `Từ  ${from} đến ${to} của ${totalRecords}`
          }
        />
      </div>
      {/* <ModalConfirm
        loading={isLoading}
        title="Xoá nguồn lực"
        message="Bạn có muốn xoá nguồn lực này?"
        onAccept={() => {
          mutate(modal.modalRM.id);
          handleCloseModal('modalRM');
          toast.success('Xoá nguồn lực thành công');
          router.refresh();
        }}
        onClose={() => handleCloseModal('modalRM')}
        open={modal.modalRM.open}
      /> */}

      <ModalThemNguonLuc
        title="Chỉnh sửa nguồn lực"
        onClose={() => handleCloseModal('modalNL')}
        open={modal.modalNL.open}
        data={modal.modalNL.resource}
        onRefresh={() => {
          router.refresh();
        }}
        isEdit
      />
    </>
  );
};

export default TableNguonLuc;
