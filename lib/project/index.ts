import axios from 'axios';
import { privateRequest } from '../axios';

const PREFIX_URL = '/project';

export const getList = (searchParams: string, accessToken?: string) => {
	return privateRequest.get(`${PREFIX_URL}?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
};

export const getListByDepartment = (idDepartment: string) =>
	privateRequest.get(`${PREFIX_URL}/${idDepartment}/department`);

export const add = (payload: IProject) =>
	privateRequest.post(`${PREFIX_URL}/add`, payload);

export const update = ({ id, ...payload }: IProject) =>
	privateRequest.patch(`${PREFIX_URL}/${id}/update`, payload);

export const addResource = ({
	id,
	resource,
}: {
	id: string;
	resource: { id: string; amount: number }[];
}) => privateRequest.post(`${PREFIX_URL}/${id}/add-resource`, { resource });

export const proposeProject = (payload: {
	idEmployee: string;
	idProject: string;
	content: string;
}) => privateRequest.post(`${PREFIX_URL}/propose`, payload);
