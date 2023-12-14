'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

import { Switch } from '@/components/ui/switch';
import { ResourceServices } from '@/lib';
import vi from 'dayjs/locale/vi';
import ModalThemNguonLuc from './modal/modal-them-nguon-luc';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

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

	const { mutate: stop, isLoading } = useMutation({
		mutationFn: ResourceServices.toggleUsing,
		onSuccess: () => {
			toast.success('Thao tác thành công');
			router.refresh();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
	});

	const { modal, handleOpenModal, handleCloseModal } = useModal({
		modalNL: { open: false, resource: {} },
		modalStop: {
			open: false,
			toggle: {
				idResource: '',
				isActive: true,
			},
		},
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
			accessor: 'isActive',
			title: 'Sử dụng',
			render: (row: IResource) => {
				return (
					<Switch
						checked={row.isActive}
						onClick={() =>
							handleOpenModal('modalStop', {
								toggle: {
									idResource: row.id,
									isActive: !row.isActive,
								},
							})
						}
					/>
				);
			},
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
			<ModalConfirm
				loading={isLoading}
				title={
					modal.modalStop.toggle.isActive
						? 'Sử dụng nguồn lực'
						: 'Dừng sử dụng nguồn lực'
				}
				message={
					modal.modalStop.toggle.isActive
						? 'Bạn có muốn sử dụng nguồn lực này trở lại'
						: 'Bạn có muốn dừng sử dụng nguồn lực này trong hệ thống'
				}
				onAccept={() => {
					console.log(modal.modalStop.toggle);
					stop({ ...modal.modalStop.toggle });
					handleCloseModal('modalStop');
				}}
				onClose={() => handleCloseModal('modalStop')}
				open={modal.modalStop.open}
				variant={modal.modalStop.toggle.isActive ? 'default' : 'destructive'}
				msgCTA="Xác nhận"
			/>

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
