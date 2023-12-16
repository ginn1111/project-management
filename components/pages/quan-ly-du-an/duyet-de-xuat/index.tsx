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
import Label from '@/components/ui/my-label';
import ReactSheet from '@/components/ui/react-sheet';
import { Textarea } from '@/components/ui/textarea';
import { StatePropose } from '@/constants/general';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { ProposeResourceServices } from '@/lib';
import { faker } from '@faker-js/faker';
import { AxiosError } from 'axios';
import { cx } from 'class-variance-authority';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
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
	const router = useRouter();
	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, tab: 'propose' },
	});
	const [dataDetail, setDataDetail] = useState<{
		resourcesProposes?: IResourcesPropose[];
		description?: OrNull<string>;
	}>({});

	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalAC: { open: false, id: '' },
		modalDN: { open: false, id: '' },
	});

	const { mutate: review, isLoading } = useMutation({
		mutationFn: ProposeResourceServices.review,
		onSuccess: (res) => {
			toast.success(res.data);
			router.refresh();
		},
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSettled: () => {
			handleCloseModal('modalAC');
			handleCloseModal('modalDN');
		},
	});

	const noteRef = useRef<HTMLTextAreaElement | null>(null);

	const sheetRef = useRef<{
		handleOpen: () => void;
		handleClose: () => void;
	}>();

	const employeePath =
		'proposeResource.employeesOfProject.proposeProject.employeesOfDepartment.employee';

	const columns: DataTableColumn<IReviewProposeResource>[] = [
		{
			accessor: employeePath,
			title: 'Nhân viên đề xuất',
			render: (record) => {
				const employee = get(record, employeePath) as IEmployee;
				return <p>{employee.fullName}</p>;
			},
		},
		{
			accessor: 'createdDate',
			title: 'Ngày giờ tạo',
			render: (record) => {
				return (
					<p>
						{dayjs(record.proposeResource.createdDate).isValid()
							? dayjs(record.proposeResource.createdDate).format(
									'DD/MM/YYYY - HH:mm'
							  )
							: 'N/A'}
					</p>
				);
			},
		},
		{
			accessor: 'reviewingDate',
			title: 'Ngày giờ duyệt',
			render: (record) => {
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
			accessor: 'note',
			title: 'Ghi chú đề xuất',
			render: (record) => {
				return <p>{record?.note ?? 'N/A'}</p>;
			},
		},
		{
			accessor: 'proposeResource.state',
			title: 'Trạng thái',
			width: 150,
			textAlignment: 'center',
			render: (record) => (
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
			render: (record) => {
				const additionalMenu = [];
				if (record.state.name === StatePropose.Pending) {
					additionalMenu.push(
						<DropdownMenuItem
							onClick={() => handleOpenModal('modalAC', { id: record.id })}
						>
							Duyệt
						</DropdownMenuItem>
					);
					additionalMenu.push(
						<DropdownMenuItem
							onClick={() => handleOpenModal('modalDN', { id: record.id })}
						>
							Từ chối
						</DropdownMenuItem>
					);
				}
				return (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<IconEllipsis />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{additionalMenu}
							<DropdownMenuItem
								onClick={() => {
									console.log(record.id);
									sheetRef.current?.handleOpen();
									setDataDetail({
										resourcesProposes: record.proposeResource.resourcesProposes,
										description: record.proposeResource.description,
									});
								}}
							>
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
				<DetailDuyetDeXuat data={dataDetail} />
			</ReactSheet>
			<ModalConfirm
				loading={isLoading}
				open={modal.modalDN.open}
				onAccept={() => {
					review({
						id: modal.modalDN.id,
						note: noteRef.current?.value ?? null,
						stateName: StatePropose.Reject,
					});
				}}
				onClose={() => handleCloseModal('modalDN')}
				title="Xác nhận từ chối đề xuất"
				message={
					<>
						<p>Bạn có muốn từ chối đề xuất này?</p>
						<div className="mt-2">
							<Label>Ghi chú</Label>
							<Textarea ref={noteRef} placeholder="ghi chú" />
						</div>
					</>
				}
				msgCTA="Từ chối"
				variant="destructive"
			/>
			<ModalConfirm
				open={modal.modalAC.open}
				loading={isLoading}
				onAccept={() => {
					review({
						id: modal.modalAC.id,
						note: noteRef.current?.value ?? null,
						stateName: StatePropose.Approve,
					});
				}}
				onClose={() => handleCloseModal('modalAC')}
				title="Xác nhận duyệt đề xuất"
				message={
					<>
						<p>Bạn có muốn duyệt đề xuất này?</p>
						<div className="mt-2">
							<Label>Ghi chú</Label>
							<Textarea ref={noteRef} placeholder="ghi chú" />
						</div>
					</>
				}
				msgCTA="Duyệt"
				variant="default"
			/>
		</div>
	);
};

export default DuyetDeXuat;
