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
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import ModalThemPhongBan from './modal/modal-them-phong-ban';
import { DepartmentServices } from '@/lib';
import dayjs from 'dayjs';

interface ITablePhongBan {
	data: { departments: IDepartment[]; totalItems: number };
}

const TablePhongBan = (props: ITablePhongBan) => {
	const router = useRouter();
	const { data } = props;
	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, search: '' },
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: (id: string) => DepartmentServices.remove(id),
	});

	const { modal, handleOpenModal, handleCloseModal } = useModal({
		modalDP: { open: false, department: {} },
		modalRM: { open: false, id: '' },
	});

	const columns = [
		{
			accessor: 'name',
			title: 'Tên phòng ban',
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
							onClick={() => handleOpenModal('modalDP', { department: row })}
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
					records={data.departments}
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
					rowExpansion={{
						allowMultiple: true,
						content: ({ record }) => {
							return (
								<>
									{(record?.employeesOfDepartment?.length ?? 0) > 0 ? (
										<DataTable
											className="min-h-[150px]"
											records={record.employeesOfDepartment ?? []}
											columns={[
												{
													accessor: 'employee.fullName',
													title: 'Nhân viên',
													width: 200,
												},
												{
													title: 'Ngày bắt đầu',
													width: 150,
													accessor: 'startDate',
													render: (row: IEmployeesOfDepartment) => (
														<p>
															{dayjs(row.startDate).isValid()
																? dayjs(row.startDate).format('DD/MM/YYYY')
																: 'N/A'}
														</p>
													),
												},
												{
													title: 'Chức vụ',
													accessor: 'employee.positions',
													width: 150,
													render: (row: IEmployeesOfDepartment) => {
														const position = row.employee?.positions?.[0];
														return (
															<p>{position ? position.position.name : 'N/A'}</p>
														);
													},
												},
											]}
										/>
									) : (
										<p className="text-muted-foreground font-medium text-md text-center">
											Chưa có nhân viên nào
										</p>
									)}
								</>
							);
						},
					}}
				/>
			</div>
			<ModalConfirm
				loading={isLoading}
				title="Xoá phòng ban"
				message="Bạn có muốn xoá phòng ban này?"
				onAccept={() => {
					mutate(modal.modalRM.id);
					handleCloseModal('modalRM');
					toast.success('Xoá phòng ban thành công');
					router.refresh();
				}}
				onClose={() => handleCloseModal('modalRM')}
				open={modal.modalRM.open}
			/>
			<ModalThemPhongBan
				open={modal.modalDP.open}
				data={modal.modalDP.department}
				onClose={() => handleCloseModal('modalDP')}
				title="Sửa phòng ban"
				onRefresh={() => router.refresh()}
				isEdit
			/>
		</>
	);
};

export default TablePhongBan;
