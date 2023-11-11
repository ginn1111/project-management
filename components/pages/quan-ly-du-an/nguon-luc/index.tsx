import useModal from '@/hooks/useModal';
import useQueryParams from '@/hooks/useQueryParams';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useParams } from 'next/navigation';

interface INguonLuc {
	data: {
		projectResource: IResourceProject[];
		totalItems: number;
	};
}

const NguonLuc = ({ data }: INguonLuc) => {
	const { id } = useParams();
	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, tab: 'resource' },
	});
	const { modal, handleCloseModal, handleOpenModal } = useModal({
		modalNL: { open: false },
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
		</div>
	);
};

export default NguonLuc;
