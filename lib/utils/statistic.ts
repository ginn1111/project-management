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
