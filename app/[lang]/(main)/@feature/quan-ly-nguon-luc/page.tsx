import FilterNguonLuc from '@/components/pages/quan-ly-nguon-luc/filter-nguon-luc';
import TableNguonLuc from '@/components/pages/quan-ly-nguon-luc/table-nguon-luc';
import { ResourceServices } from '@/lib';
import { getResourceTypeList } from '@/lib/utils/resource-type';
import { getUserInfoFromNextAuth } from '@/utils/get-user-from-next-auth';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const NguonLuc = async ({
	searchParams,
}: {
	searchParams: ISearchParams & { idResourceType?: string };
}) => {
	const user = await getUserInfoFromNextAuth();
	const resourceData = await ResourceServices.getList(
		`page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
			parseInt(searchParams.limit as any) || 10
		}&search=${searchParams.search ?? ''}&idResourceType=${
			searchParams.idResourceType ?? ''
		}`,
		user?.accessToken
	);
	const resourceTypeData = await getResourceTypeList();

	return (
		<div className="m-2 rounded-sm p-2">
			<FilterNguonLuc resourceTypeList={resourceTypeData?.data} />
			<div className="mt-4">
				<TableNguonLuc data={resourceData.data} />
			</div>
		</div>
	);
};

export default NguonLuc;
