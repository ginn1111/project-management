'use client';
import IconEllipsis from '@/components/Icon/IconEllipsis';
import IconPlus from '@/components/Icon/IconPlus';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/useModal';
import { QualificationServices } from '@/lib';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { useIsMounted } from 'usehooks-ts';
import ModalThemBangCap from '../../modal/modal-them-bang-cap';
import ModalChuyenMon from './modal/modal-chuyen-mon';

interface IBangCap {
	idEmp: string;
}

const BangCap = ({ idEmp }: IBangCap) => {
	const {
		data: qualificationData,
		isLoading,
		refetch,
	} = useQuery<AxiosResponse<IQualificationEmployee[]>>({
		queryFn: () => QualificationServices.getList(idEmp),
		queryKey: ['qualification', idEmp],
	});

	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalCM: { open: false, isEdit: false, role: {} },
		modalCS: { open: false, isEdit: false, qualification: {} },
	});
	const columns: DataTableColumn<IQualificationEmployee>[] = [
		{
			accessor: '',
			title: 'Tên',
			render: (row: IQualificationEmployee) => {
				return <p>{row.qualification?.name}</p>;
			},
		},
		{
			title: 'Ngày cấp',
			accessor: 'date',
			render: ({ date }: { date: string }) => (
				<p>
					{dayjs(date).isValid() ? dayjs(date).format('DD/MM/YYYY') : 'N/A'}
				</p>
			),
		},
		{
			title: 'Ghi chú',
			accessor: 'note',
			render: ({ note }: { note: string }) => <p>{note ?? 'N/A'}</p>,
		},
		{
			accessor: '',
			width: 70,
			render: (row: IQualificationEmployee) => (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<IconEllipsis />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() =>
								handleOpenModal('modalCM', {
									isEdit: false,
									role: { idEmp, id: row.qualification.id },
								})
							}
						>
							Chuyên môn
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								handleOpenModal('modalCS', {
									isEdit: true,
									qualification: { ...row },
								})
							}
						>
							Sửa
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<p className="text-lg font-bold mb-1">Bằng cấp</p>
				<Button
					onClick={() =>
						handleOpenModal('modalCS', {
							isEdit: false,
							qualification: { idEmployee: idEmp },
						})
					}
				>
					<IconPlus />
				</Button>
			</div>
			<div className="datatables">
				<DataTable
					noRecordsText="Không có dữ liệu"
					highlightOnHover
					className="table-hover whitespace-nowrap"
					records={qualificationData?.data ?? []}
					columns={columns}
					minHeight={200}
					fetching={isLoading}
					rowExpansion={{
						allowMultiple: true,
						content: ({ record }) => {
							return (
								<DataTable
									noRecordsText="Không có dữ liệu"
									highlightOnHover
									className="min-h-[150px]"
									records={record.qualification.rolesOfEmployee}
									columns={[
										{ accessor: 'roleName', title: 'Tên chuyên môn' },
										{
											accessor: 'startDate',
											title: 'Ngày bắt đầu',
											render: (row: IRole) => {
												return (
													<p>
														{dayjs(row.startDate).isValid()
															? dayjs(row.startDate).format('ddd, DD/MM/YYYY')
															: 'N/A'}
													</p>
												);
											},
										},
										{
											accessor: 'endDate',
											title: 'Ngày kết thúc',
											render: (row: IRole) => {
												return (
													<p>
														{dayjs(row.endDate).isValid()
															? dayjs(row.endDate).format('DD/MM/YYYY')
															: 'N/A'}
													</p>
												);
											},
										},
										{
											accessor: '',
											title: 'Phòng ban',
											render: (row: IRole) => {
												console.log(row);
												return <p>{row.departmentOfEmp?.department?.name}</p>;
											},
										},
										{
											accessor: '',
											title: 'Ngày bắt đầu phòng ban',
											textAlignment: 'center',
											render: (row: IRole) => {
												return (
													<p>
														{dayjs(row.departmentOfEmp?.startDate).isValid()
															? dayjs(row.departmentOfEmp?.startDate).format(
																	'DD/MM/YYYY'
															  )
															: 'N/A'}
													</p>
												);
											},
										},
									]}
								/>
							);
						},
					}}
				/>
			</div>
			<ModalChuyenMon
				open={modal.modalCM.open}
				data={modal.modalCM.role}
				onClose={() => handleCloseModal('modalCM')}
				title="Chuyên môn"
				onRefresh={() => refetch()}
			/>
			<ModalThemBangCap
				isEdit={modal.modalCS.isEdit}
				data={modal.modalCS.qualification}
				open={modal.modalCS.open}
				onClose={() => handleCloseModal('modalCS')}
				title="bằng cấp"
				onRefresh={() => refetch()}
			/>
		</div>
	);
};

export default BangCap;
