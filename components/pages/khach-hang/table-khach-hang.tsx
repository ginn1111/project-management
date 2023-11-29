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
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

import { GenderIndex } from '@/constants/indexes';
import { CustomerServices } from '@/lib';
import vi from 'dayjs/locale/vi';
import ModalThemKhachHang from './modal/modal-them-khach-hang';

dayjs.locale(vi);

interface ITableKhachHang {
	provinces: {
		id: string;
		code: number;
		name: string;
	};
	data: { customers: ICustomer[]; totalItems: number };
}

const TableKhachHang = (props: ITableKhachHang) => {
	const router = useRouter();
	const { data, provinces } = props;

	const queryClient = useQueryClient();
	queryClient.setQueryData('provinces', provinces);

	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, search: '' },
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: (id: string) => CustomerServices.remove(id),
	});

	const { modal, handleOpenModal, handleCloseModal } = useModal({
		modalKH: { open: false, customer: {} },
		modalRM: { open: false, id: '' },
	});

	const columns: DataTableColumn<ICustomer>[] = [
		{
			accessor: 'fullName',
			title: 'Họ tên',
		},
		{
			accessor: 'phone',
			title: 'Số điện thoại',
		},
		{
			accessor: 'email',
			title: 'Email',
		},
		{
			accessor: 'gender',
			title: 'Giới tính',
			render: ({ gender }) => (
				<p>{GenderIndex[gender as keyof typeof GenderIndex]}</p>
			),
		},
		{
			accessor: 'identityNumber',
			title: 'CMND/CCCD',
		},
		{
			accessor: 'address',
			title: 'Địa chỉ',
			render: (row) => (
				<p>
					{row.address} {row.ward?.name} {row.district?.name}{' '}
					{row.province?.name}
				</p>
			),
		},
		{
			accessor: 'fax',
			title: 'Fax',
		},
		{
			accessor: '',
			render: (row) => (
				<DropdownMenu modal>
					<DropdownMenuTrigger>
						<IconEllipsis />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="-translate-x-[10px]">
						<DropdownMenuItem
							onClick={() => handleOpenModal('modalKH', { customer: row })}
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
					records={data.customers}
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
			<ModalThemKhachHang
				open={modal.modalKH.open}
				title="Sửa khách hàng"
				onClose={() => handleCloseModal('modalKH')}
				data={modal.modalKH.customer}
				onRefresh={() => {
					router.refresh();
				}}
				isEdit
			/>
			<ModalConfirm
				loading={isLoading}
				title="Xoá khách hàng"
				message="Bạn có muốn xoá khách hàng này?"
				onAccept={() => {
					mutate(modal.modalRM.id);
					handleCloseModal('modalRM');
					toast.success('Xoá khách hàng thành công');
					router.refresh();
				}}
				onClose={() => handleCloseModal('modalRM')}
				open={modal.modalRM.open}
			/>
		</>
	);
};

export default TableKhachHang;
