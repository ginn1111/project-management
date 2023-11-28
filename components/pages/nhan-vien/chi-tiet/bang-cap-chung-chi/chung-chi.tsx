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
import { CertificationServices } from '@/lib';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useIsMounted } from 'usehooks-ts';
import ModalThemChungChi from '../../modal/modal-them-chung-chi';

interface IChungChi {
	idEmp: string;
}

const ChungChi = ({ idEmp }: IChungChi) => {
	const {
		data: certificationData,
		isLoading,
		refetch,
	} = useQuery<AxiosResponse<ICertsEmployee[]>>({
		queryFn: () => CertificationServices.getList(idEmp),
		queryKey: ['certificate', idEmp],
	});

	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalCC: { open: false, isEdit: false, certification: {} },
	});
	const columns = [
		{
			accessor: '',
			title: 'Tên',
			render: (row: ICertsEmployee) => {
				return <p>{row.certification.name}</p>;
			},
		},
		{
			title: 'Ngày cấp',
			accessor: 'date',
			render: ({ date }: ICertsEmployee) => (
				<p>
					{dayjs(date).isValid() ? dayjs(date).format('DD/MM/YYYY') : 'N/A'}
				</p>
			),
		},
		{
			title: 'Ngày hết hạn',
			accessor: 'expiredDate',
			render: ({ expiredDate }: ICertsEmployee) => (
				<p>
					{dayjs(expiredDate).isValid()
						? dayjs(expiredDate).format('DD/MM/YYYY')
						: 'N/A'}
				</p>
			),
		},
		{
			title: 'Ghi chú',
			accessor: 'note',
			render: ({ note }: ICertsEmployee) => <p>{note ?? 'N/A'}</p>,
		},
		{
			accessor: '',
			width: 70,
			render: (row: ICertsEmployee) => (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<IconEllipsis />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() =>
								handleOpenModal('modalCC', {
									isEdit: true,
									certification: { ...row },
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
				<p className="text-lg font-bold mb-1">Chứng chỉ</p>
				<Button
					onClick={() =>
						handleOpenModal('modalCC', {
							isEdit: false,
							certification: { idEmployee: idEmp },
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
					records={certificationData?.data ?? []}
					columns={columns}
					minHeight={200}
					fetching={isLoading}
				/>
			</div>
			<ModalThemChungChi
				isEdit={modal.modalCC.isEdit}
				open={modal.modalCC.open}
				data={modal.modalCC.certification}
				onClose={() => handleCloseModal('modalCC')}
				title="chứng chỉ"
				onRefresh={() => refetch()}
			/>
		</div>
	);
};

export default ChungChi;
