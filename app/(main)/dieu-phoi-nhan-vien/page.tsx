import ChartNVPB from '@/components/pages/dieu-phoi-nhan-vien/chart-nvpb';
import FilterDPNV from '@/components/pages/dieu-phoi-nhan-vien/filter-dpnv';
import { Role } from '@/constants/general';
import { StatisticServices } from '@/lib';
import { getUserInfoFromNextAuth } from '@/utils/get-user-from-next-auth';
import { AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';

const DieuPhoiNhanVien = async ({
	searchParams,
}: {
	searchParams: {
		startDate?: string;
		finishDate?: string;
	};
}) => {
	const user = await getUserInfoFromNextAuth();
	const userInfor = user?.info;
	const idDepartment = userInfor?.departments?.[0]?.idDepartment;
	const position = userInfor?.positions?.[0]?.position?.code;

	if (position !== Role.TRUONG_PHONG || !idDepartment) {
		redirect('/api/logout');
	}

	const projectOfEmp: AxiosResponse<{
		projectsOfEmp: {
			employee: IEmployee;
			projects: { project: IProject }[];
		}[];
	}> = await StatisticServices.statisticProjectByEmpOfDepartment(
		`startDate=${searchParams.startDate ?? ''}&finishDate=${
			searchParams.finishDate ?? ''
		}&idDepartment=${userInfor?.departments?.[0]?.idDepartment}`,
		user?.accessToken
	);

	return (
		<div>
			<FilterDPNV />
			<ChartNVPB data={projectOfEmp.data?.projectsOfEmp ?? []} />
		</div>
	);
};

export default DieuPhoiNhanVien;
