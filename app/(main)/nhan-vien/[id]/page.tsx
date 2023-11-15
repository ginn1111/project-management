import React from 'react';
import * as EmployeeServices from '@/lib/employee';
import { default as _ChiTietNhanVien } from '@/components/pages/nhan-vien/chi-tiet';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
