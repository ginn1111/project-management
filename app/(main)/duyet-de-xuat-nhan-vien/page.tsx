import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FilterDuyetDXNV from '@/components/pages/duyet-de-xuat-nhan-vien/filter-duyet-de-xuat-nhan-vien';
import TableDuyetDXNV from '@/components/pages/duyet-de-xuat-nhan-vien/table-duyet-de-xuat-nhan-vien';
import { ProjectServices, ReviewProjectServices } from '@/lib';
import { getServerSession } from 'next-auth';
import React from 'react';

const DuyetDeXuatNhanVien = async ({
	searchParams,
}: {
	searchParams: ISearchParams;
}) => {
	const session = await getServerSession(authOptions);

	const reviewProposeProject = await ReviewProjectServices.getList(
		`page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
			parseInt(searchParams.limit as any) || 10
		}&idProject=${searchParams.idProject ?? ''}`,
		session?.user.accessToken
	);

	const project = await ProjectServices.getList('', session?.user.accessToken);

	return (
		<div className="m-2 rounded-sm p-2">
			<FilterDuyetDXNV projects={project.data.projects} />
			<div className="mt-4">
				<TableDuyetDXNV data={reviewProposeProject.data} />
			</div>
		</div>
	);
};

export default DuyetDeXuatNhanVien;
