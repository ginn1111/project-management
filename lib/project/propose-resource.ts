import { privateRequest } from '../axios';

const PREFIX_URL = '/project/propose/resource';

export const getList = ({
	idProject,
	searchParams,
}: {
	idProject: string;
	searchParams: string;
}) => privateRequest.get(`${PREFIX_URL}/${idProject}/review?${searchParams}`);

export const add = ({
	idEmpProject,
	...payload
}: {
	resource: { id: string; amount: number }[];
	idEmpProject: string;
	description?: string;
}) =>
	privateRequest.post(`${PREFIX_URL}/${idEmpProject}/create`, { ...payload });
