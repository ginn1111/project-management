import { privateRequest } from '../axios';

const PREFIX_URL = '/project/employee';

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
	privateRequest.get(`${PREFIX_URL}/${idProject}?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
