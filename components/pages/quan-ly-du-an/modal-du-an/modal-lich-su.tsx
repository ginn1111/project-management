import Modal, { IModalProps } from '@/components/ui/modal';
import { QueryKeys } from '@/constants/query-key';
import { WorkProjectServices } from '@/lib';
import dayjs from 'dayjs';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import { useQuery } from 'react-query';

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
				return (
					<div className="max-w-[400px]">
						<ReactJson
							collapseStringsAfterLength={10}
							src={JSON.parse(record?.content ?? '{}')}
							enableClipboard={false}
							displayDataTypes={false}
						/>
					</div>
				);
			},
		},
		{
			width: 300,
			accessor: 'note',
			title: 'Ghi chú',
			render: (record) => {
				return <p className="whitespace-normal">{record.note}</p>;
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
