import Modal, { IModalProps } from '@/components/ui/modal';
import { QueryKeys } from '@/constants/query-key';
import { WorkProjectServices } from '@/lib';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';

const TitleObject = {
	finishDateET: 'Thời gian hoàn thành dự kiến',
	startDate: 'Thời gian bắt đầu',
	name: 'Tên đầu việc',
	employeeEdit: 'Nhân viên chỉnh sửa',
	department: 'Phòng ban',
};

const ModalLichSu = (props: Omit<IModalProps<IWorkProject>, 'children'>) => {
	const { data, ...rest } = props;
	const params = useParams();
	const [paging, setPaging] = useState({ page: 1, limit: 10 });

	const { data: historyData, isFetching } = useQuery({
		queryKey: QueryKeys.getWorkHistory(
			data?.idWork ?? '',
			paging.page.toString(),
			paging.limit.toString(),
			params.id as string
		),
		queryFn: ({ queryKey }) => {
			return WorkProjectServices.getHistory(
				queryKey[1],
				queryKey[4],
				`page=${(Number(queryKey[2]) || 1) - 1}&limit=${queryKey[3]}`
			);
		},
		enabled: rest.open && !!data?.id && !!(params?.id as string),
	});

	const columns: DataTableColumn<IHistory>[] = [
		{
			accessor: 'createdDate',
			title: 'Ngày tạo',
			render: (record) => {
				return (
					<p>
						{dayjs(record.createdDate).isValid()
							? dayjs(record.createdDate).format('HH:mm:ss - DD/MM/YYYY')
							: 'N/A'}
					</p>
				);
			},
		},
		{
			accessor: 'content',
			title: 'Nội dung',
			render: (record) => {
				try {
					const parsedContent = JSON.parse(record?.content ?? '{}');
					const formatObj = (
						Object.entries(parsedContent) as [any, any]
					).reduce((acc, [key, value]) => {
						if (key.includes('Date')) {
							acc[TitleObject[key as keyof typeof TitleObject]] =
								dayjs(value).format('DD/MM/YYYY');
						} else {
							acc[TitleObject[key as keyof typeof TitleObject]] = value;
						}

						return acc;
					}, {} as Record<string, string>);

					return (
						<ul className="max-w-[400px] space-y-2">
							{Object.entries(formatObj).map(([key, value]) => (
								<li className="flex items-center gap-2" key={key}>
									<p className="text-primary2 bg-primary2-light px-2 py-1 rounded-sm">
										{key}
									</p>
									<p>{value as string} </p>
								</li>
							))}
						</ul>
					);
				} catch {
					return <p>N/A</p>;
				}
			},
		},
		{
			width: 300,
			accessor: 'note',
			title: 'Ghi chú',
			render: (record) => {
				return <p className="whitespace-normal">{record.note || 'N/A'}</p>;
			},
		},
	];

	return (
		<Modal {...rest} loading={isFetching}>
			<div className="w-[80vh]">
				<div className="datatables h-[90vh]">
					<DataTable
						noRecordsText="Không có dữ liệu"
						highlightOnHover
						className="table-hover whitespace-nowrap"
						records={historyData?.data?.historyOfWork ?? []}
						columns={columns}
						totalRecords={historyData?.data.totalItems}
						onPageChange={(page) => {
							setPaging((old) => ({ ...old, page }));
						}}
						page={paging.page}
						recordsPerPage={paging.limit}
						minHeight={200}
					/>
				</div>{' '}
			</div>
		</Modal>
	);
};

export default ModalLichSu;
