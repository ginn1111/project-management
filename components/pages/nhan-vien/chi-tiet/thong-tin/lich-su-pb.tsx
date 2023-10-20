'use client';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';

interface ILichSuPB {
  departments?: EmployeesOfDepartment[];
}

const LichSuPB = ({ departments }: ILichSuPB) => {
  const columns = [
    {
      accessor: '',
      title: 'Tên phòng ban',
      render: (row: EmployeesOfDepartment) => {
        return <p>{row.department.name}</p>;
      },
    },
    {
      accessor: 'startDate',
      title: 'Ngày bắt đầu',
      render: ({ startDate }: EmployeesOfDepartment) => {
        return (
          <p>{startDate ? dayjs(startDate).format('DD/MM/YYYY') : 'N/A'}</p>
        );
      },
    },
    {
      accessor: 'endDate',
      title: 'Ngày kết thúc',
      render: ({ endDate }: EmployeesOfDepartment) => {
        return <p>{endDate ? dayjs(endDate).format('DD/MM/YYYY') : 'N/A'}</p>;
      },
    },
  ];
  return (
    <div>
      <p className="mb-1 text-lg font-bold">Lịch sử phòng ban</p>
      <div className="datatables">
        <DataTable
          noRecordsText="No results match your search query"
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
