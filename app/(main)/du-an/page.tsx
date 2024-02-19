import FilterDuAn from '@/components/pages/du-an/filter-du-an';
import ListDuAn from '@/components/pages/du-an/list-du-an';
import LoadingInline from '@/components/ui/loading/loading-inline';
import { Role } from '@/constants/general';
import { ProjectServices } from '@/lib';
import { getUserInfoFromNextAuth } from '@/utils/get-user-from-next-auth';
import { Suspense } from 'react';

const DuAn = async ({
	searchParams,
}: {
	searchParams: ISearchParams & {
		startDate?: string;
		finishDateET?: string;
		idDepartment?: string;
	};
}) => {
	const user = await getUserInfoFromNextAuth();
	const userInfo = user?.info;
	const idDepartment = userInfo?.departments?.[0]?.idDepartment;
	const isHead = userInfo?.role === Role.TRUONG_PHONG;
	const isSuperHead = userInfo?.role === Role.QUAN_LY_TRUONG_PHONG;

	const isDisable = !isHead && !isSuperHead && !idDepartment;

	const projectListData = isDisable
		? { data: { totalItems: 0, projects: [] } }
		: await ProjectServices.getList(
				`search=${searchParams.search ?? ''}&startDate=${
					searchParams.startDate ?? ''
				}&finishDateET=${searchParams.finishDateET ?? ''}&idDepartment=${
					isSuperHead ? '' : idDepartment
				}`,
				user?.accessToken
		  );

	return (
		<div>
			<FilterDuAn />
			<Suspense fallback={<LoadingInline />}>
				<ListDuAn data={projectListData.data} />
			</Suspense>
		</div>
	);
};

export default DuAn;
