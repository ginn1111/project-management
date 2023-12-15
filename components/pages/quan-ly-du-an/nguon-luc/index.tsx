import { Button } from '@/components/ui/button';
import ModalConfirm from '@/components/ui/modal/modal-confirm';
import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { ResourceServices } from '@/lib';
import { cn } from '@/lib/utils';
import { AxiosError } from 'axios';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface INguonLuc {
	data: {
		projectResource: IResourceProject[];
		totalItems: number;
	};
	projectData: IProject;
}

const NguonLuc = ({ data, projectData }: INguonLuc) => {
	const router = useRouter();
	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalReturn: { open: false, id: '' },
	});
	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, tab: 'resource' },
	});
	const isDoneOrCancel = projectData.finishDate || projectData.canceledDate;

	const { mutate: returnResource, isLoading } = useMutation({
		mutationFn: ResourceServices.returnResource,
		onError: (error: AxiosError) => {
			toast.error(error.response?.data as string);
		},
		onSuccess: () => {
			toast.success('Hoàn tác thành công');
			router.refresh();
		},
		onSettled: () => {
			handleCloseModal('modalReturn');
		},
	});

	const columns: DataTableColumn<IResourceProject>[] = [
		{
			accessor: 'resource.name',
			title: 'Tên nguồn lực',
		},
		{
			accessor: 'resource.resourceType.name',
			title: 'Loại',
		},
		{
			accessor: 'resource.isActive',
			title: 'Sử dụng',
			render: (row: IResourceProject) => {
				return (
					<p className={cn({ ['text-destructive']: !row.resource.isActive })}>
						{row.resource.isActive ? 'Đang sử dụng' : 'Tạm dừng'}
					</p>
				);
			},
		},
		{
			accessor: 'resource',
			title: 'Số lượng đã dùng/ tổng',
			textAlignment: 'right',
			render: (record: IResourceProject) => {
				const usedAmount =
					record.resourceOfTasks?.reduce(
						(acc, task) => acc + task?.amount,
						0
					) ?? 0;
				return <p>{`${usedAmount}/${record.amount + usedAmount}`}</p>;
			},
		},
		{
			accessor: '',
			textAlignment: 'right',
			render: (row: IResourceProject) => (
				<Button
					variant="outline"
					size="sm"
					disabled={
						(!isDoneOrCancel && row.resource.isActive) || row.amount === 0
					}
					onClick={() => handleOpenModal('modalReturn', { id: row.id })}
				>
					Hoàn tác
				</Button>
			),
		},
	];

	return (
		<div className="mx-2">
			<div className="datatables">
				<DataTable
					noRecordsText="Không có dữ liệu"
					highlightOnHover
					className="table-hover whitespace-nowrap"
					records={data.projectResource}
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
				title="Hoàn tác nguồn lực"
				message="Hoàn tác số lượng nguồn lực còn lại?"
				onAccept={() => returnResource(modal.modalReturn.id)}
				onClose={() => handleCloseModal('modalReturn')}
				open={modal.modalReturn.open}
				variant="default"
				msgCTA="Xác nhận"
			/>
		</div>
	);
};

export default NguonLuc;
