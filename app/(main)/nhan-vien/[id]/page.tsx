import authOptions from '@/app/api/auth/[...nextauth]/options';
import { default as _ChiTietNhanVien } from '@/components/pages/nhan-vien/chi-tiet';
import { PluginServices } from '@/lib';
import * as EmployeeServices from '@/lib/employee';
import { getServerSession } from 'next-auth';

// export const dynamicParams = false; -> will redirect to 404 page if params to not exist in generateStaticParams

export async function generateStaticParams() {
	const response = await PluginServices.getListEmp(`page=1&limit=10`);

	const responseData = response.data;

	if (!responseData?.length) {
		return [];
	}

	return responseData.map((e) => ({
		id: e.id,
	}));
}

const ChiTietNhanVien = async ({
	params,
}: {
	params: Record<string, string>;
}) => {
	const session = await getServerSession(authOptions);

	const detailEmployee = await EmployeeServices.getDetail(
		params.id,
		session?.user.accessToken
	);
	return <_ChiTietNhanVien detail={detailEmployee} />;
};

export default ChiTietNhanVien;
