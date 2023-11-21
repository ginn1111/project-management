import { privateRequest } from '../axios';

const PREFIX_URL = '/department';

export const create = (department: Partial<IDepartment>) =>
	privateRequest.post(`${PREFIX_URL}/add`, {
		...department,
	});

export const addToEmployee = (
	idDepartment: string,
	idEmployee: string,
	data: Partial<Omit<IEmployeesOfDepartment, 'department'> & { idOld: string }>
) =>
	privateRequest.post(
		`${PREFIX_URL}/add/${idDepartment}/${idEmployee}/employee`,
		{
			...data,
		}
	);

export const getList = (searchParams: string, accessToken?: string) =>
	privateRequest.get(`${PREFIX_URL}?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const getListByEmployee = (idEmployee: string) =>
	privateRequest.get(`${PREFIX_URL}/${idEmployee}/employee`);

export const update = ({ id, ...rest }: Partial<IDepartment>) =>
	privateRequest.patch(`${PREFIX_URL}/${id}/update`, { ...rest });

export const updateByEmployee = (
	idEmpDepartment: string,
	{ id, ...rest }: Partial<Omit<IEmployeesOfDepartment, 'department'>>
) =>
	privateRequest.patch(`${PREFIX_URL}/${idEmpDepartment}/update/employee`, {
		...rest,
	});

export const remove = (id: string) =>
	privateRequest.delete(`${PREFIX_URL}/${id}/remove`);

export const getDetail = (id: string) =>
	privateRequest.get(`${PREFIX_URL}/${id}`);
