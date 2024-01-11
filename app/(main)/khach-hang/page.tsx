import authOptions from '@/app/api/auth/[...nextauth]/options';
import FilterKhachHang from '@/components/pages/khach-hang/filter-khach-hang';
import TableKhachHang from '@/components/pages/khach-hang/table-khach-hang';
import { Role } from '@/constants/general';
import { CustomerServices } from '@/lib';
import { getProvinces } from '@/lib/utils/address';
import { getServerSession } from 'next-auth';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const KhachHang = async ({ searchParams }: { searchParams: ISearchParams }) => {
	const session = await getServerSession(authOptions);
	const userInfo = session?.user?.info;
	const idDepartment = userInfo?.departments?.[0]?.idDepartment;
	const isHead = userInfo?.role === Role.TRUONG_PHONG;
	const isSuperHead = userInfo?.role === Role.QUAN_LY_TRUONG_PHONG;

	const customerData = await CustomerServices.getList(
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
			<FilterKhachHang />
			<div className="mt-4">
				<TableKhachHang data={customerData.data} provinces={provinces} />
			</div>
		</div>
	);
};

export default KhachHang;
