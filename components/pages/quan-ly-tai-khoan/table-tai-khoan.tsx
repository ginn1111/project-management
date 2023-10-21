'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { Switch } from '@/components/ui/switch';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { AccountServices } from '@/lib';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import ModalDoiMK from './modal/modal-doi-mat-khau';

interface ITableTaiKhoan {
  data: { accounts: IAccount[]; totalItems: number };
}

const TablePhongBan = (props: ITableTaiKhoan) => {
  const router = useRouter();
  const { data } = props;
  const { handlePush, searchParams } = useQueryParams({
    initSearchParams: { page: 1, limit: 10, search: '' },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: IAccount) => AccountServices.active(payload),
  });

  const { modal, handleOpenModal, handleCloseModal } = useModal({
    modalCS: { open: false, account: {} },
    modalRM: { open: false, data: { isActive: true } },
  });

  const columns = [
    {
      accessor: 'username',
      title: 'Tài khoản',
    },
    {
      accessor: 'note',
      title: 'Ghi chú',
    },
    {
      accessor: 'isActive',
      width: 140,
      title: 'Kích hoạt',
      render: (row: IAccount) => {
        return (
          <Switch
            onCheckedChange={(isActive) =>
              handleOpenModal('modalRM', {
                data: { isActive, username: row.username },
              })
            }
            checked={row.isActive}
          />
        );
      },
    },
    {
      accessor: '',
      width: 70,
      render: (row: IAccount) => (
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <IconEllipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-[10px]">
            <DropdownMenuItem
              onClick={() => handleOpenModal('modalCS', { account: row })}
            >
              Chỉnh sửa
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
          records={data.accounts ?? []}
          columns={columns}
          totalRecords={data.totalItems ?? 10}
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
          idAccessor="username"
          // rowExpansion={{
          //   allowMultiple: true,
          //   content: ({ record }) => {
          //     return (
          //       <DataTable
          //         noHeader
          //         records={record.accountsOfEmployee}
          //         columns={[
          //           {
          //             accessor: '',
          //             render: (row: AccountsOfEmployee) => {
          //               return <p>{row.employee?.fullName}</p>;
          //             },
          //           },
          //           {
          //             accessor: 'createdDate',
          //             render: (row: AccountsOfEmployee) => {
          //               return (
          //                 <p>
          //                   {dayjs(row.createdDate).isValid()
          //                     ? dayjs(row.createdDate).format(
          //                         'ddd, DD/MM/YYYY hh:mm'
          //                       )
          //                     : 'N/A'}
          //                 </p>
          //               );
          //             },
          //           },
          //         ]}
          //       />
          //     );
          //   },
          // }}
        />
      </div>
      <ModalConfirm
        loading={isLoading}
        open={modal.modalRM.open}
        title={`${
          modal.modalRM.data.isActive ? 'Kích hoạt' : 'Vô hiệu hoá'
        } tài khoản`}
        onAccept={() => {
          mutate(modal.modalRM.data as any);

          handleCloseModal('modalRM');
          toast.success(
            `${
              modal.modalRM.data.isActive ? 'Kích hoạt' : 'Vô hiệu hoá'
            } thành công`
          );
          router.refresh();
        }}
        onClose={() => handleCloseModal('modalRM')}
        msgCTA={`${modal.modalRM.data.isActive ? 'Kích hoạt' : 'Vô hiệu hoá'}`}
        message={`Bạn có muốn ${
          modal.modalRM.data.isActive ? 'kích hoạt' : 'vô hiệu hoá'
        } tài khoản này?`}
        variant={modal.modalRM.data.isActive ? 'default' : 'destructive'}
      />
      <ModalDoiMK
        open={modal.modalCS.open}
        onClose={() => handleCloseModal('modalCS')}
        data={modal.modalCS.account}
        title="Đổi mật khẩu"
        onRefresh={() => {
          router.refresh();
        }}
      />
    </>
  );
};

export default TablePhongBan;
