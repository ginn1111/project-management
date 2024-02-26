import authOptions from '@/app/api/auth/[...nextauth]/options';
import FilterNhanVien from '@/components/pages/nhan-vien/filter-nhan-vien';
import TableNhanVien from '@/components/pages/nhan-vien/table-nhan-vien';
import { Role } from '@/constants/general';
import { getList } from '@/lib/employee';
import { getProvinces } from '@/lib/utils/address';
import { getServerSession } from 'next-auth';

const NhanVien = async ({ searchParams }: { searchParams: ISearchParams }) => {
	const session = await getServerSession(authOptions);
	const userInfo = session?.user?.info;
	const idDepartment = userInfo?.departments?.[0]?.idDepartment;
	const isHead = userInfo?.role === Role.TRUONG_PHONG;
	const isSuperHead = userInfo?.role === Role.QUAN_LY_TRUONG_PHONG;

	const employeeData = await getList(
		`page=${(parseInt(searchParams.page as any) || 1) - 1}&limit=${
			parseInt(searchParams.limit as any) || 10
		}&search=${searchParams.search ?? ''}&idDepartment=${
			isHead ? idDepartment : isSuperHead ? '' : ''
		}`,
		session?.user?.accessToken
	);
	const provincesData = await getProvinces();
	const provinces = provincesData.data;

	return (
		<div className="m-2 rounded-sm p-2">
			<FilterNhanVien />
			<div className="mt-4">
				<TableNhanVien
					provinces={provinces}
					data={employeeData.data}
					isSuperHead={isSuperHead}
				/>
			</div>
		</div>
	);
};

export default NhanVien;
