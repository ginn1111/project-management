import { privateRequest } from '../axios';

const PREFIX_URL = '/customer';

export const create = (customer: Partial<Omit<ICustomer, 'id'>>) =>
	privateRequest.post(`${PREFIX_URL}/add`, {
		...customer,
	});

export const getList = (searchParams: string, accessToken?: string) => {
	return privateRequest.get(`${PREFIX_URL}?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
};

export const update = ({ id, ...rest }: Partial<ICustomer>) =>
	privateRequest.patch(`${PREFIX_URL}/${id}/update`, { ...rest });

export const remove = (id: string) =>
	privateRequest.delete(`${PREFIX_URL}/${id}/delete`);
