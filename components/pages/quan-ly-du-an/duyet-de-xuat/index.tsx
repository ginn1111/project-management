'use client';

import IconEllipsis from '@/components/Icon/IconEllipsis';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import ReactSheet from '@/components/ui/react-sheet';
import { StatePropose } from '@/constants/general';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { faker } from '@faker-js/faker';
import { cx } from 'class-variance-authority';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { DataTable } from 'mantine-datatable';
import { useRef } from 'react';
import DetailDuyetDeXuat from './detail-duyet-de-xuat';

const DUMMY = Array(20)
	.fill(0)
	.map(() => ({
		id: faker.string.binary(),
		description: faker.finance.ethereumAddress(),
		time: faker.date.anytime(),
		employee: faker.internet.displayName(),
		status:
			Math.floor(Math.random()) > 0.6
				? 'Đang chờ duyệt'
				: Math.floor(Math.random()) > 0.3
				? 'Từ chối'
				: 'Đã duyệt',
	}));

interface IDuyetDeXuat {
	data: {
		proposeResource: IReviewProposeResource[];
		totalItems: number;
	};
}

const DuyetDeXuat = ({ data }: IDuyetDeXuat) => {
	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, tab: 'propose' },
	});
	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalAC: { open: false },
		modalDN: { open: false },
	});
	const sheetRef = useRef<{
		handleOpen: () => void;
		handleClose: () => void;
	}>();

	const employeePath =
		'proposeResource.employeesOfProject.proposeProject.employeesOfDepartment.employee';

	const columns = [
		{
			accessor: employeePath,
			title: 'Nhân viên đề xuất',
			render: (record: IReviewProposeResource) => {
				const employee = get(record, employeePath) as IEmployee;
				return <p>{employee.fullName}</p>;
			},
		},
		{
			accessor: 'reviewingDate',
			title: 'Ngày giờ duyệt',
			render: (record: IReviewProposeResource) => {
				return (
					<p>
						{dayjs(record.reviewingDate).isValid()
							? dayjs(record.reviewingDate).format('DD/MM/YYYY - HH:mm')
							: 'N/A'}
					</p>
				);
			},
		},
		{
			accessor: 'proposeResource.description',
			title: 'Nội dung đề xuất',
			render: (record: IReviewProposeResource) => {
				return <p>{record?.proposeResource?.description ?? 'N/A'}</p>;
			},
		},
		{
			accessor: 'proposeResource.state',
			title: 'Trạng thái',
			width: 150,
			textAlignment: 'center',
			render: (record: IReviewProposeResource) => (
				<p
					className={cx('text-[12px] rounded-md py-[2px]', {
						'text-success bg-success-light':
							record.state.name === StatePropose.Approve,
						'text-danger bg-danger-light':
							record.state.name === StatePropose.Reject,
						'text-info bg-info-light':
							record.state.name === StatePropose.Pending,
					})}
				>
					{record.state.name ?? 'N/A'}
				</p>
			),
		},
		{
			accessor: 'action',
			title: '',
			width: 70,
			render: (record: IReviewProposeResource) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<IconEllipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => handleOpenModal('modalAC')}>
								Duyệt
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleOpenModal('modalDN')}>
								Từ chối
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => sheetRef.current?.handleOpen()}>
								Chi tiết
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
	return (
		<div className="mx-2">
			<div className="datatables">
				<DataTable
					noRecordsText="Không có dữ liệu"
					highlightOnHover
					className="table-hover whitespace-nowrap"
					records={data.proposeResource}
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
			<ReactSheet
				ref={sheetRef}
				title="Chi tiết đề xuất"
				className="w-[50vw] sm:max-w-[800px]"
			>
				<DetailDuyetDeXuat />
			</ReactSheet>
			<ModalConfirm
				open={modal.modalDN.open}
				onAccept={() => {}}
				onClose={() => handleCloseModal('modalDN')}
				title="Xác nhận từ chối đề xuất"
				message="Bạn có muốn từ chối đề xuất này?"
				msgCTA="Từ chối"
				variant="destructive"
			/>
			<ModalConfirm
				open={modal.modalAC.open}
				onAccept={() => {}}
				onClose={() => handleCloseModal('modalAC')}
				title="Xác nhận duyệt đề xuất"
				message="Bạn có muốn duyệt đề xuất này?"
				msgCTA="Duyệt"
				variant="default"
			/>
		</div>
	);
};

export default DuyetDeXuat;
