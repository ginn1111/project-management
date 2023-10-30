'use client';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';

interface ILichSuPB {
	departments?: IEmployeesOfDepartment[];
}

const LichSuPB = ({ departments }: ILichSuPB) => {
	const columns = [
		{
			accessor: '',
			title: 'Tên phòng ban',
			render: (row: IEmployeesOfDepartment) => {
				return <p>{row.department.name}</p>;
			},
		},
		{
			accessor: 'startDate',
			title: 'Ngày bắt đầu',
			render: ({ startDate }: IEmployeesOfDepartment) => {
				return (
					<p>{startDate ? dayjs(startDate).format('DD/MM/YYYY') : 'N/A'}</p>
				);
			},
		},
		{
			accessor: 'endDate',
			title: 'Ngày kết thúc',
			render: ({ endDate }: IEmployeesOfDepartment) => {
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
					highlightOnHover
					className="table-hover whitespace-nowrap"
					records={departments}
					totalRecords={departments?.length}
					columns={columns}
					minHeight={200}
				/>
			</div>
		</div>
	);
};

export default LichSuPB;
