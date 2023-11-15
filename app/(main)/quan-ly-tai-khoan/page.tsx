import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FilterTaiKhoan from '@/components/pages/quan-ly-tai-khoan/filter-tai-khoan';
import TableTaiKhoan from '@/components/pages/quan-ly-tai-khoan/table-tai-khoan';
import { Role } from '@/constants/general';
import { AccountServices } from '@/lib';
import { getServerSession } from 'next-auth';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const QuanLyTaiKhoan = async ({
	searchParams,
}: {
	searchParams: ISearchParams;
}) => {
	const session = await getServerSession(authOptions);
	const isHead =
		session?.user.info.positions?.[0]?.position?.code === Role.TRUONG_PHONG;

	const accountData = await AccountServices.getList(
		`page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
			parseInt(searchParams.limit as any) || 10
		}&search=${searchParams.search ?? ''}&idDepartment=${
			isHead ? session.user.info.departments?.[0]?.idDepartment : ''
		}`,
		session?.user.accessToken
	);
	return (
		<div className="m-2 rounded-sm p-2">
			<FilterTaiKhoan />
			<div className="mt-4">
				<TableTaiKhoan data={accountData.data} />
			</div>
		</div>
	);
};

export default QuanLyTaiKhoan;
