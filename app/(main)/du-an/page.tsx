import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FilterDuAn from '@/components/pages/du-an/filter-du-an';
import ListDuAn from '@/components/pages/du-an/list-du-an';
import { ProjectServices } from '@/lib';
import { getServerSession } from 'next-auth';

const DuAn = async ({
	searchParams,
}: {
	searchParams: ISearchParams & {
		startDate?: string;
		finishDateET?: string;
		idDepartment?: string;
	};
}) => {
	const session = await getServerSession(authOptions);
	// TODO filter depend on idDepartment
	const idDepartment = session?.user.info.departments?.[0]?.idDepartment;

	const projectListData = await ProjectServices.getList(
		`search=${searchParams.search ?? ''}&startDate=${
			searchParams.startDate ?? ''
		}&finishDateET=${searchParams.finishDateET ?? ''}&idDepartment=${''}`,
		session?.user.accessToken
	);
	return (
		<div>
			<FilterDuAn />
			<ListDuAn data={projectListData.data} />
		</div>
	);
};

export default DuAn;
