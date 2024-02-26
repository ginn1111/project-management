import React from 'react';

const TableNhanVienPage = () => {
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
	return <div>TableNhanVienPage</div>;
};

export default TableNhanVienPage;
