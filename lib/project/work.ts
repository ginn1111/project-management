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

export const done = (idWorkProject: string) =>
	privateRequest.post(`${PREFIX_URL}/${idWorkProject}/done`);

// assignment
export const assign = ({ id, ...payload }: Partial<IWorkProject>) =>
	privateRequest.post(`${PREFIX_URL}/${id}/assign`, payload);

// task
export const createTask = ({ id, ...payload }: Partial<ITaskOfWork>) =>
	privateRequest.post(`${PREFIX_URL}/${id}/task/create`, payload);
export const updateTask = ({ id, ...payload }: Partial<ITaskOfWork>) =>
	privateRequest.patch(`${PREFIX_URL}/${id}/task/update`, payload);

export const getHistory = (
	idWorkProject: string,
	idProject: string,
	searchParams: string
) =>
	privateRequest.post(
		`${PREFIX_URL}/${idWorkProject}/history?${searchParams}`,
		{
			idProject,
		}
	);

export const getHistoryOfTask = (
	idTaskOfWork: string,
	idProject: string,
	searchParams: string
) =>
	privateRequest.post(
		`${PREFIX_URL}/${idTaskOfWork}/task/history?${searchParams}`,
		{
			idProject,
		}
	);

export const doneTask = ({
	idTaskOfWOrk,
	percentOfDone,
}: {
	idTaskOfWOrk: string;
	percentOfDone: number;
}) =>
	privateRequest.post(`${PREFIX_URL}/${idTaskOfWOrk}/task/done`, {
		percentOfDone,
	});

export const addResourceForTask = ({
	idTask,
	idProject,
	resource,
}: {
	idTask: string;
	idProject: string;
	resource: { id: string; amount: number }[];
}) =>
	privateRequest.post(
		`${PREFIX_URL}/${idProject}/${idTask}/task/add-resource`,
		{ resource }
	);
