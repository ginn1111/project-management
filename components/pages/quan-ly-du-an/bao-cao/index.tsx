import useQueryParams from '@/hooks/useQueryParams';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';

interface IBaoCao {
	data: {
		reports: IReport[];
		totalItems: number;
	};
}

const BaoCao = ({ data }: IBaoCao) => {
	const { handlePush, searchParams } = useQueryParams({
		initSearchParams: { page: 1, limit: 10, tab: 'report' },
	});

	const columns: DataTableColumn<IReport>[] = [
		{
			accessor: 'employee.fullName',
			title: 'Nhân viên',
			width: 150,
		},
		{
			accessor: 'department.name',
			title: 'Phòng ban',
			width: 150,
		},
		{
			accessor: 'createdDate',
			title: 'Thời gian tạo',
			width: 200,
			render: (record) => (
				<p>{dayjs(record.createdDate).format('HH:mm ddd, DD/MM/YYYY')}</p>
			),
		},
		{
			accessor: 'content',
			title: 'Nội dung',
		},
	];
	return (
		<div className="mx-2">
			<div className="datatables">
				<DataTable
					noRecordsText="Không có dữ liệu"
					highlightOnHover
					className="table-hover whitespace-nowrap"
					records={data.reports}
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

export default BaoCao;
