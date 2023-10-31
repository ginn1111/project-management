import { Label } from '@/components/ui/label';
import { faker } from '@faker-js/faker';
import { DataTable, DataTableColumn } from 'mantine-datatable';

const DUMMY = Array(10)
	.fill(0)
	.map(() => ({
		id: faker.string.alphanumeric(),
		name: faker.internet.displayName(),
		amount: 10,
	}));

interface IDetailDuyetDeXuat {
	data: {
		resourcesProposes?: IResourcesPropose[];
		description?: OrNull<string>;
	};
}

const DetailDuyetDeXuat = ({ data }: IDetailDuyetDeXuat) => {
	const columns: DataTableColumn<IResourcesPropose>[] = [
		{
			accessor: 'resource.name',
			title: 'Nguồn lực',
		},
		{
			accessor: 'amount',
			textAlignment: 'right',
			title: 'Số lượng',
		},
	];

	return (
		<div className="space-y-2">
			{data.description ? (
				<div className="ring-2 ring-muted rounded-md mb-5 px-4 py-2">
					<Label>Mô tả</Label>
					<p>{data.description}</p>
				</div>
			) : null}
			<div className="datatables">
				<DataTable
					noRecordsText="Không có dữ liệu"
					highlightOnHover
					className="table-hover whitespace-nowrap"
					records={data.resourcesProposes ?? []}
					columns={columns}
					minHeight={200}
				/>
			</div>
		</div>
	);
};

export default DetailDuyetDeXuat;
