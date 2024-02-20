import { EmployeeServices } from '@/lib';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

const getListEmployee = async (req: NextRequest, res: Response) => {
	const cookies = req.cookies.get('next-auth.session-token');
	console.log(cookies);
	// console.log(accessToken?.value);
	// if (!accessToken) {
	// 	redirect('/api/logout');
	// } else {
	// 	const url = new URL(req.url);
	// 	console.log({
	// 		searchParams: url.searchParams.toString(),
	// 		accessToken: accessToken.value,
	// 	});

	// 	const employeeList = await EmployeeServices.getList(
	// 		url.searchParams.toString(),
	// 		accessToken.value
	// 	);

	return NextResponse.json('ok');
};

export { getListEmployee as GET, getListEmployee as POST };
