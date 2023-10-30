'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { GenderIndex } from '@/constants/indexes';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import * as EmployeeServices from '@/lib/employee';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import { get } from 'lodash';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

dayjs.locale(vi);

interface ITableNhanVien {
  data: { employeesOfProject: IEmployeeProject[]; totalItems: number };
}

const TableNhanVien = (props: ITableNhanVien) => {
  const router = useRouter();
  const { data } = props;
  console.log(data.employeesOfProject);
  const { handlePush, searchParams } = useQueryParams({
    initSearchParams: { page: 1, limit: 10, search: '' },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => EmployeeServices.remove(id),
  });

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalNV: { open: false, employee: {} },
    modalRM: { open: false, id: '' },
    modalPB: { open: false, employee: { departments: [] } },
    modalCV: { open: false, employee: { positions: [] } },
    modalTK: { open: false, employee: {} },
  });

  const employeePath = 'proposeProject.employeesOfDepartment.employee';

  const columns = [
    {
      accessor: `${employeePath}.fullName`,
      title: 'Họ tên',
    },
    {
      accessor: `${employeePath}.phone`,
      title: 'Số điện thoại',
    },
    {
      accessor: `${employeePath}.gender`,
      title: 'Giới tính',
      render: (record: IEmployeeProject) => (
        <p>
          {
            GenderIndex[
              get(record, `${employeePath}.gender`) as keyof typeof GenderIndex
            ]
          }
        </p>
      ),
    },
    {
      accessor: 'birthday',
      title: 'Ngày sinh',
      render: (record: IEmployeeProject) => {
        const birthday = get(record, `${employeePath}.birthday`);
        return <p>{birthday ? dayjs(birthday).format('DD/MM/YYYY') : 'N/A'}</p>;
      },
    },
    {
      accessor: `${employeePath}.email`,
      title: 'Email',
    },
    {
      accessor: `${employeePath}.identifyNumber`,
      title: 'CMND/CCCD',
    },
    {
      accessor: '',
      render: (row: IEmployeeProject) => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-[10px]">
            <DropdownMenuItem>Chỉnh sửa quyền</DropdownMenuItem>
            <DropdownMenuItem>Giao việc</DropdownMenuItem>
            <DropdownMenuItem>Xem workload</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive hover:!text-destructive">
              Xoá khỏi dự án
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
          records={data.employeesOfProject}
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
      <ModalConfirm
        loading={isLoading}
        title="Xoá nhân viên"
        message="Bạn có muốn xoá nhân viên này?"
        onAccept={() => {
          mutate(modal.modalRM.id);
          handleCloseModal('modalRM');
          toast.success('Xoá nhân viên thành công');
          router.refresh();
        }}
        onClose={() => handleCloseModal('modalRM')}
        open={modal.modalRM.open}
      />
    </>
  );
};

export default TableNhanVien;
