import { privateRequest } from '../axios';

export const create = (employee: Partial<IEmployee>) =>
	privateRequest.post('/employee/add', {
		...employee,
	});

export const getList = (searchParams: string, accessToken?: string) => {
	return privateRequest.get(`/employee?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
};

export const update = ({ id, ...rest }: Partial<IEmployee>) =>
	privateRequest.patch(`/employee/${id}/update`, { ...rest });

export const remove = (id: string) =>
	privateRequest.delete(`/employee/${id}/remove`);

export const getDetail = (id: string, accessToken?: string) =>
	privateRequest.get(`/employee/${id}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
