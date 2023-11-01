import { StatePropose } from '@/constants/general';
import { privateRequest } from '../axios';

const PREFIX_URL = '/project/propose/resource';

export const getList = (
	{
		idProject,
		searchParams,
	}: {
		idProject: string;
		searchParams: string;
	},
	accessToken?: string
) =>
	privateRequest.get(`${PREFIX_URL}/${idProject}/review?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const add = ({
	idEmpProject,
	...payload
}: {
	resource: { id: string; amount: number }[];
	idEmpProject: string;
	description?: string;
}) =>
	privateRequest.post(`${PREFIX_URL}/${idEmpProject}/create`, { ...payload });

export const review = ({
	id,
	...payload
}: {
	id: string;
	note: OrNull<string>;
	stateName: ValueOf<typeof StatePropose>;
}) => privateRequest.post(`${PREFIX_URL}/${id}/review`, payload);
