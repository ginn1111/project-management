import Modal, { IModalProps } from '@/components/ui/modal';
import { QueryKeys } from '@/constants/query-key';
import { WorkProjectServices } from '@/lib';
import ReactJson from 'react-json-view';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { DataTable, DataTableColumn } from 'mantine-datatable';

const ModalLichSu = (props: Omit<IModalProps<IWorkProject>, 'children'>) => {
	const { data, ...rest } = props;
	const [paging, setPaging] = useState({ page: 1, limit: 10 });

	const { data: historyData, isFetching } = useQuery({
		queryKey: QueryKeys.getWorkHistory(
			data?.id ?? '',
			paging.page.toString(),
			paging.limit.toString()
		),
		queryFn: ({ queryKey }) => {
			console.log(Number(queryKey[2]));
			return WorkProjectServices.getHistory(
				queryKey[1],
				`page=${(Number(queryKey[2]) || 1) - 1}&limit=${queryKey[3]}`
			);
		},
		enabled: rest.open && !!data?.id,
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
						/>
					</div>
				);
			},
		},
		{
			accessor: 'note',
			title: 'Ghi chú',
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
