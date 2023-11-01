import { privateRequest } from '../axios';

const PREFIX_URL = '/project/work';

export const getList = (
	{ idProject }: { idProject: string },
	accessToken?: string
) =>
	privateRequest.get(`${PREFIX_URL}/${idProject}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});

export const add = ({ idProject, ...payload }: Partial<IWorkProject>) =>
	privateRequest.post(`${PREFIX_URL}/${idProject}/create`, payload);

export const update = ({ id, ...payload }: Partial<IWorkProject>) =>
	privateRequest.post(`${PREFIX_URL}/${id}/update`, payload);
