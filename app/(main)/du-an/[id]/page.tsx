import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import QuanLyDuAn from '@/components/pages/quan-ly-du-an';
import {
	EmployeeProjectServices,
	ProjectServices,
	ProposeResourceServices,
	ResourceProjectServices,
	WorkProjectServices,
} from '@/lib';
import { AxiosResponse } from 'axios';
import { getServerSession } from 'next-auth';

type Tab =
	| 'works-board'
	| 'works-calendar'
	| 'employee'
	| 'propose'
	| 'resource';

const getData: Record<
	Tab,
	(
		idProject: string,
		searchParams: string,
		accessToken?: string
	) => Promise<AxiosResponse>
> = {
	'works-board': (idProject: string, _: unknown, accessToken?: string) =>
		WorkProjectServices.getList({ idProject }, accessToken),
	'works-calendar': (idProject: string, _: unknown, accessToken?: string) =>
		WorkProjectServices.getList({ idProject }, accessToken),
	employee: (idProject: string, searchParams: string, accessToken?: string) =>
		EmployeeProjectServices.getList({ idProject, searchParams }, accessToken),

	propose: (idProject: string, searchParams: string, accessToken?: string) =>
		ProposeResourceServices.getList({ idProject, searchParams }, accessToken),
	resource: (idProject: string, searchParams: string, accessToken?: string) =>
		ResourceProjectServices.getList({ idProject, searchParams }, accessToken),
};

const DuAn = async ({
	params,
	searchParams,
}: IRouterParams<
	{ id: string },
	{
		tab?: Tab;
		page?: string;
		limit?: string;
	}
>) => {
	const { id } = params;
	const { tab } = searchParams;
	const session = await getServerSession(authOptions);

	const [data, projectData] = await Promise.all([
		getData[tab ?? 'works-board']?.(
			id,
			`page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
				parseInt(searchParams.limit as any) || 10
			}`,
			session?.user.accessToken
		),
		ProjectServices.getDetail(id, session?.user.accessToken),
	]);

	return (
		<div className="flex overflow-x-auto">
			<QuanLyDuAn data={data?.data} project={projectData?.data} />
		</div>
	);
};

export default DuAn;
