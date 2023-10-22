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
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import ModalChuyenPB from './modal/modal-chuyen-pb';
import ModalThemNhanVien from './modal/modal-them-nhan-vien';

import vi from 'dayjs/locale/vi';

dayjs.locale(vi);

interface ITableNhanVien {
  provinces: {
    id: string;
    code: number;
    name: string;
  };
  data: { employees: IEmployee[]; totalItems: number };
}

const TableNhanVien = (props: ITableNhanVien) => {
  const router = useRouter();
  const { provinces, data } = props;
  const { handlePush, searchParams } = useQueryParams({
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
    modalPB: { open: false, employee: { departments: [] } },
    modalTK: { open: false },
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
            <DropdownMenuItem
              onClick={() =>
                handleOpenModal('modalPB', {
                  employee: { departments: row.departments, id: row.id },
                })
              }
            >
              Chuyển phòng ban
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
            handlePush({ limit, page: 1 });
          }}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Từ  ${from} đến ${to} của ${totalRecords}`
          }
          rowExpansion={{
            allowMultiple: true,
            content: ({ record }) => {
              return (
                <>
                  {(record?.accounts?.length ?? 0) > 0 ? (
                    <DataTable
                      className="min-h-[150px]"
                      records={record.accounts}
                      columns={[
                        {
                          accessor: 'username',
                          title: 'Tên tài khoản',
                        },
                        {
                          title: 'Ngày tạo tài khoản',
                          accessor: 'createdDate',
                          render: (row: AccountsOfEmployee) => {
                            return (
                              <p>
                                {dayjs(row.createdDate).isValid()
                                  ? dayjs(row.createdDate).format(
                                      'ddd, DD/MM/YYYY hh:mm'
                                    )
                                  : 'N/A'}
                              </p>
                            );
                          },
                        },
                      ]}
                    />
                  ) : (
                    <p className="text-muted-foreground font-medium text-md text-center">
                      Không có tài khoản
                    </p>
                  )}
                </>
              );
            },
          }}
        />
      </div>
      <ModalThemNhanVien
        open={modal.modalNV.open}
        title="Sửa nhân viên"
        onClose={() => handleCloseModal('modalNV')}
        data={modal.modalNV.employee}
        onRefresh={() => {
          router.refresh();
        }}
        isEdit
      />
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
      <ModalChuyenPB
        open={modal.modalPB.open}
        onClose={() => handleCloseModal('modalPB')}
        title="Chuyển phòng ban nhân viên"
        data={modal.modalPB.employee}
        onRefresh={() => router.refresh()}
      />
    </>
  );
};

export default TableNhanVien;
