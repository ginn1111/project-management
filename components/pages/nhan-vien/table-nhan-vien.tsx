'use client';

import * as EmployeeServices from '@/lib/employee';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { DataTable } from 'mantine-datatable';
import { useMutation, useQueryClient } from 'react-query';
import ModalChuyenPB from './modal/modal-chuyen-pb';
import ModalThemBangCap from './modal/modal-them-bang-cap';
import ModalThemChungChi from './modal/modal-them-chung-chi';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';
import { GenderIndex } from '@/constants/indexes';
import dayjs from 'dayjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import Link from 'next/link';
import { toast } from 'sonner';

interface ITableNhanVien {
  provinces: {
    id: string;
    code: number;
    name: string;
  };
  data: { employees: IEmployee[]; totalItems: number };
}

const TableNhanVien = (props: ITableNhanVien) => {
  const { provinces, data } = props;
  const { handlePush, handleReset, searchParams } = useQueryParams({
    initSearchParams: { page: 1, limit: 10, search: '' },
  });
  const queryClient = useQueryClient();
  queryClient.setQueryData('provinces', provinces);

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => EmployeeServices.remove(id),
  });

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false, employee: {} },
    modalRM: { open: false, id: '' },
    modalPB: { open: false },
    modalBC: { open: false },
    modalCC: { open: false },
  });

  const columns = [
    {
      accessor: 'fullName',
      title: 'Họ tên',
    },
    {
      accessor: 'phone',
      title: 'Số điện thoại',
    },
    {
      accessor: 'gender',
      title: 'Họ tên',
      render: ({ gender }: { gender: string }) => (
        <p>{GenderIndex[gender as keyof typeof GenderIndex]}</p>
      ),
    },
    {
      accessor: 'birthday',
      title: 'Ngày sinh',
      render: ({ birthday }: { birthday: string }) => (
        <p>{birthday ? dayjs(birthday).format('DD/MM/YYYY') : 'N/A'}</p>
      ),
    },
    {
      accessor: 'email',
      title: 'Họ tên',
    },
    {
      accessor: 'identifyNumber',
      title: 'CMND/CCCD',
    },
    {
      accessor: '',
      render: (row: IEmployee) => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-[10px]">
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalNV', { employee: row })}
            >
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href={`/nhan-vien/${row.id}`}>
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
          noRecordsText="No results match your search query"
          highlightOnHover
          className="table-hover whitespace-nowrap"
          records={data.employees}
          columns={columns}
          totalRecords={data.totalItems}
          recordsPerPage={parseInt(searchParams.limit)}
          page={parseInt(searchParams.page)}
          onPageChange={(p) => {
            handlePush({ page: p });
          }}
          recordsPerPageOptions={[10, 20, 30, 50, 100]}
          onRecordsPerPageChange={(limit) => {
            handlePush({ limit: limit });
          }}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
        />
      </div>
      <ModalThemNhanVien
        open={modal.modalNV.open}
        title="Sửa nhân viên"
        onClose={() => handleCloseModal('modalNV')}
        data={modal.modalNV.employee}
        onRefresh={() => {
          handlePush({});
        }}
        isEdit
      />
      <ModalConfirm
        loading={isLoading}
        title="Xoá nhân viên"
        message="Bạn có muốn xoá nhân viên này?"
        onAccept={() => {
          mutate(modal.modalRM.id);
          handlePush({});
          handleCloseModal('modalRM');
          toast.success('Xoá nhân viên thành công');
        }}
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
