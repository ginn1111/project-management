import { privateRequest } from '../axios';

const PREFIX_URL = '/statistic';

export const statisticWork = ({
	idProject,
	searchParams,
}: {
	idProject: string;
	searchParams: string;
}) => privateRequest.get(`${PREFIX_URL}/work/${idProject}?${searchParams}`);

export const statisticProject = (searchParams?: string) =>
	privateRequest.get(`${PREFIX_URL}/project?${searchParams}`);

export const statisticProjectByEmpOfDepartment = (
	searchParams?: string,
	accessToken?: string
) =>
	privateRequest.get(`${PREFIX_URL}/employee?${searchParams}`, {
		headers: {
			['x-authorization']: `Bearer ${accessToken}`,
		},
	});
