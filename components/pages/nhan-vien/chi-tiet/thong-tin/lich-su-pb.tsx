'use client';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';

interface ILichSuPB {
	departments?: IEmployeesOfDepartment[];
}

const LichSuPB = ({ departments }: ILichSuPB) => {
	const columns: DataTableColumn<IEmployeesOfDepartment>[] = [
		{
			accessor: '',
			title: 'Tên phòng ban',
			render: (row) => {
				return <p>{row.department.name}</p>;
			},
		},
		{
			accessor: 'startDate',
			title: 'Ngày bắt đầu',
			render: ({ startDate }) => {
				return (
					<p>{startDate ? dayjs(startDate).format('DD/MM/YYYY') : 'N/A'}</p>
				);
			},
		},
		{
			accessor: 'endDate',
			title: 'Ngày kết thúc',
			render: ({ endDate }) => {
				return <p>{endDate ? dayjs(endDate).format('DD/MM/YYYY') : 'N/A'}</p>;
			},
		},
	];
	return (
		<div>
			<p className="mb-1 text-lg font-bold">Lịch sử phòng ban</p>
			<div className="datatables">
				<DataTable
					noRecordsText="Không có dữ liệu"
					className="table-hover whitespace-nowrap"
					records={departments ?? []}
					columns={columns}
					minHeight={200}
				/>
			</div>
		</div>
	);
};

export default LichSuPB;
